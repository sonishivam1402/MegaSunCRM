import { sql, poolPromise } from "../database/db.js";
import https from "https";
import { CRON_API_KEY, INTERVAL, LEAD_SOURCE_NAME, CREATED_BY_USER_ID, IS_CRON_ON } from "../config/env.js";

/* ============================================================
   ✅ GLOBAL VARIABLES
============================================================ */
let cronEnabled = false;
let cronInterval = null;

/* ============================================================
   🧩 UTILITY HELPERS
============================================================ */
function getTimestamp() {
    return new Date().toISOString();
}

function getIndiaMartDate(daysOffset = 0) {
    const date = new Date();
    date.setDate(date.getDate() + daysOffset);
    const day = String(date.getDate()).padStart(2, "0");
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

function buildApiUrl() {
    const today = getIndiaMartDate(0);
    return `https://mapi.indiamart.com/wservce/crm/crmListing/v2/?glusr_crm_key=${CRON_API_KEY}&start_time=${today}&end_time=${today}`;
}

/* ============================================================
   🧱 DATABASE LOGGING HELPER
============================================================ */
async function logToDatabase({
    LogType,
    Status,
    Message = null,
    Details = null,
    ErrorMessage = null,
    StackTrace = null,
    ErrorNumber = null,
    ErrorState = null,
    ErrorClass = null,
    ProcName = null,
    LineNumber = null,
    InsertedCount = null,
    DuplicateCount = null,
    TotalProcessed = null,
    ResultStatus = null,
    ApiUrl = null,
    ApiResponseCode = null,
    ApiResponseMessage = null,
    TotalRecords = null,
    SourceName = "IndiaMART",
    TriggeredBy = "CRON"
}) {
    try {
        const pool = await poolPromise;
        await pool.request()
            .input("LogType", sql.NVarChar(50), LogType)
            .input("Status", sql.NVarChar(50), Status)
            .input("Message", sql.NVarChar(1000), Message)
            .input("Details", sql.NVarChar(sql.MAX), Details)
            .input("ErrorMessage", sql.NVarChar(1000), ErrorMessage)
            .input("StackTrace", sql.NVarChar(sql.MAX), StackTrace)
            .input("ErrorNumber", sql.Int, ErrorNumber)
            .input("ErrorState", sql.Int, ErrorState)
            .input("ErrorClass", sql.Int, ErrorClass)
            .input("ProcName", sql.NVarChar(255), ProcName)
            .input("LineNumber", sql.Int, LineNumber)
            .input("InsertedCount", sql.Int, InsertedCount)
            .input("DuplicateCount", sql.Int, DuplicateCount)
            .input("TotalProcessed", sql.Int, TotalProcessed)
            .input("ResultStatus", sql.NVarChar(100), ResultStatus)
            .input("ApiUrl", sql.NVarChar(1000), ApiUrl)
            .input("ApiResponseCode", sql.Int, ApiResponseCode)
            .input("ApiResponseMessage", sql.NVarChar(500), ApiResponseMessage)
            .input("TotalRecords", sql.Int, TotalRecords)
            .input("SourceName", sql.NVarChar(255), SourceName)
            .input("TriggeredBy", sql.NVarChar(100), TriggeredBy)
            .query(`
                INSERT INTO IndiaMartLogs (
                    LogType, Status, Message, Details, ErrorMessage, StackTrace,
                    ErrorNumber, ErrorState, ErrorClass, ProcName, LineNumber,
                    InsertedCount, DuplicateCount, TotalProcessed, ResultStatus,
                    ApiUrl, ApiResponseCode, ApiResponseMessage, TotalRecords,
                    SourceName, TriggeredBy
                )
                VALUES (
                    @LogType, @Status, @Message, @Details, @ErrorMessage, @StackTrace,
                    @ErrorNumber, @ErrorState, @ErrorClass, @ProcName, @LineNumber,
                    @InsertedCount, @DuplicateCount, @TotalProcessed, @ResultStatus,
                    @ApiUrl, @ApiResponseCode, @ApiResponseMessage, @TotalRecords,
                    @SourceName, @TriggeredBy
                );
            `);
    } catch (err) {
        console.error(`[${getTimestamp()}] ⚠️ Failed to write log to DB: ${err.message}`);
    }
}

async function logErrorToDatabase(error, context = "SYSTEM") {
    await logToDatabase({
        LogType: "ERROR",
        Status: "error",
        ErrorMessage: error.message,
        StackTrace: error.stack,
        ErrorNumber: error.number,
        ErrorState: error.state,
        ErrorClass: error.class,
        ProcName: error.procName,
        LineNumber: error.lineNumber,
        TriggeredBy: context
    });
}

/* ============================================================
   💾 DATABASE INSERTION FOR LEADS
============================================================ */
async function insertLeadsToDatabase(leads) {
    try {
        const pool = await poolPromise;
        const leadsJson = JSON.stringify(leads);

        const request = pool.request();
        const result = await request
            .input("LeadSourceName", sql.NVarChar(255), LEAD_SOURCE_NAME)
            .input("LeadsData", sql.NVarChar(sql.MAX), leadsJson)
            .input("CreatedBy", sql.UniqueIdentifier, CREATED_BY_USER_ID)
            .execute("sp_CreateAPIImportedBulkLeads");

        if (result.recordset && result.recordset.length > 0) {
            const r = result.recordset[0];
            await logToDatabase({
                LogType: "DB_OPERATION",
                Status: "success",
                Message: "Lead data inserted into database",
                InsertedCount: r.InsertedCount,
                DuplicateCount: r.DuplicateCount,
                TotalProcessed: r.TotalProcessed,
                ResultStatus: r.Status,
                Details: r.Message
            });
        } else {
            await logToDatabase({
                LogType: "DB_OPERATION",
                Status: "warning",
                Message: "Stored procedure returned no recordset"
            });
        }

    } catch (error) {
        console.error(`[${getTimestamp()}] ❌ DATABASE ERROR: ${error.message}`);
        await logErrorToDatabase(error, "DB_OPERATION");
        throw error;
    }
}

/* ============================================================
   🔄 DATA PROCESSING LOGIC
============================================================ */
async function processData(data) {
    if (data.CODE === 200 && data.STATUS === "SUCCESS") {
        const total = data.TOTAL_RECORDS || 0;
        await logToDatabase({
            LogType: "API_FETCH",
            Status: "success",
            Message: `Fetched ${total} leads successfully`,
            ApiResponseCode: data.CODE,
            ApiResponseMessage: data.MESSAGE,
            TotalRecords: total
        });

        if (Array.isArray(data.RESPONSE) && data.RESPONSE.length > 0) {
            await insertLeadsToDatabase(data.RESPONSE);
        } else {
            await logToDatabase({
                LogType: "API_FETCH",
                Status: "info",
                Message: "No new leads to process"
            });
        }
    } else if (data.CODE === 429) {
        await logToDatabase({
            LogType: "API_FETCH",
            Status: "warning",
            Message: "Rate limit reached",
            ApiResponseCode: 429,
            ApiResponseMessage: data.MESSAGE
        });
    } else {
        await logToDatabase({
            LogType: "API_FETCH",
            Status: "error",
            Message: `API Error: ${data.MESSAGE || "Unknown"}`,
            ApiResponseCode: data.CODE
        });
    }
}

/* ============================================================
   🌐 API FETCH FUNCTION
============================================================ */
function fetchData() {
    return new Promise((resolve, reject) => {
        const apiUrl = buildApiUrl();
        https.get(apiUrl, (res) => {
            let data = "";

            res.on("data", (chunk) => {
                data += chunk;
            });

            res.on("end", async () => {
                try {
                    const jsonData = JSON.parse(data);
                    //console.log("JSONdata : ", jsonData)
                    await logToDatabase({
                        LogType: "API_FETCH",
                        Status: "info",
                        Message: "Fetched raw data from API",
                        ApiUrl: apiUrl,
                        ApiResponseCode: jsonData.CODE,
                        ApiResponseMessage: jsonData.MESSAGE,
                        TotalRecords: jsonData.TOTAL_RECORDS
                    });
                    await processData(jsonData);
                    resolve(jsonData);
                } catch (error) {
                    await logErrorToDatabase(error, "API_FETCH");
                    reject(error);
                }
            });

        }).on("error", async (error) => {
            await logErrorToDatabase(error, "API_FETCH");
            reject(error);
        });
    });
}

/* ============================================================
   ⏱️ CRON CONTROL
============================================================ */
function startCron() {
    if (cronInterval) {
        // console.log(`[${getTimestamp()}] ⚠️  Cron already running`);
        return false;
    }
    fetchData();
    cronInterval = setInterval(fetchData, INTERVAL);
    cronEnabled = true;

    logToDatabase({
        LogType: "CRON_CONTROL",
        Status: "info",
        Message: "Cron job started successfully",
        TriggeredBy: "SYSTEM"
    });

    return true;
}

function stopCron() {
    if (!cronInterval) {
        // console.log(`[${getTimestamp()}] ⚠️  Cron not running`);
        return false;
    }
    clearInterval(cronInterval);
    cronInterval = null;
    cronEnabled = false;

    logToDatabase({
        LogType: "CRON_CONTROL",
        Status: "info",
        Message: "Cron job stopped",
        TriggeredBy: "SYSTEM"
    });

    return true;
}

/* ============================================================
   📦 EXPRESS CONTROLLERS
============================================================ */
export const triggerIndiaMartSync = async (req, res) => {
    try {
        await logToDatabase({
            LogType: "CRON_CONTROL",
            Status: "info",
            Message: "Manual IndiaMART lead sync triggered",
            TriggeredBy: "MANUAL"
        });

        await fetchData();
        res.status(200).json({
            message: "IndiaMART leads synced successfully",
            timestamp: getTimestamp()
        });
    } catch (err) {
        await logErrorToDatabase(err, "MANUAL_TRIGGER");
        res.status(500).json({ message: "Error syncing IndiaMART leads", error: err.message });
    }
};

export const toggleIndiaMartCron = async (req, res) => {
    try {
        const { enable } = req.body;

        if (enable === true) {
            const started = startCron();
            res.status(200).json({
                message: started ? "Cron job started successfully" : "Cron job already running",
                enabled: cronEnabled,
                timestamp: getTimestamp()
            });
        } else if (enable === false) {
            const stopped = stopCron();
            res.status(200).json({
                message: stopped ? "Cron job stopped successfully" : "Cron not running",
                enabled: cronEnabled,
                timestamp: getTimestamp()
            });
        } else {
            res.status(400).json({ message: "Invalid request. Provide 'enable': true/false" });
        }
    } catch (err) {
        await logErrorToDatabase(err, "CRON_TOGGLE");
        res.status(500).json({ message: "Error toggling cron job", error: err.message });
    }
};

export const getIndiaMartCronStatus = async (req, res) => {
    try {
        res.status(200).json({
            enabled: cronEnabled,
            running: cronInterval !== null,
            interval: `${INTERVAL / 1000 / 60} minutes`,
            timestamp: getTimestamp()
        });
    } catch (err) {
        await logErrorToDatabase(err, "STATUS_CHECK");
        res.status(500).json({ message: "Error getting cron status", error: err.message });
    }
};

/* ============================================================
   🚀 AUTO START ON SERVER LAUNCH
============================================================ */
export const startCronOnServerStart = () => { 
    const CRON_ON = IS_CRON_ON === "true";
    if(CRON_ON){
        startCron();
    }
};
