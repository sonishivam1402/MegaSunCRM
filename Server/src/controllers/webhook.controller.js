import { sql, poolPromise } from "../database/db.js";
import { LEAD_SOURCE_NAME, CREATED_BY_USER_ID } from "../config/env.js";

/* ============================================================
  UTILITY HELPERS
============================================================ */
function getTimestamp() {
  return new Date().toISOString();
}

/* ============================================================
  DATABASE LOGGING HELPER
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
  TriggeredBy = "WEBHOOK",
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
    console.error(`[${getTimestamp()}] ⚠️ Failed to write log: ${err.message}`);
  }
}

async function logErrorToDatabase(error, context = "WEBHOOK") {
  await logToDatabase({
    LogType: "ERROR",
    Status: "error",
    ErrorMessage: error.message,
    StackTrace: error.stack,
    TriggeredBy: context,
  });
}

/* ============================================================
  DATABASE INSERTION FOR LEADS
============================================================ */
async function insertLeadsToDatabase(leads) {
  try {
    const pool = await poolPromise;
    const leadsJson = JSON.stringify(leads);

    const result = await pool.request()
      .input("LeadSourceName", sql.NVarChar(255), LEAD_SOURCE_NAME)
      .input("LeadsData", sql.NVarChar(sql.MAX), leadsJson)
      .input("CreatedBy", sql.UniqueIdentifier, CREATED_BY_USER_ID)
      .execute("sp_CreateAPIImportedBulkLeads");

    if (result.recordset?.length) {
      const r = result.recordset[0];
      await logToDatabase({
        LogType: "DB_OPERATION",
        Status: "success",
        Message: "Lead data inserted via webhook",
        InsertedCount: r.InsertedCount,
        DuplicateCount: r.DuplicateCount,
        TotalProcessed: r.TotalProcessed,
        ResultStatus: r.Status,
        Details: r.Message,
      });
    } else {
      await logToDatabase({
        LogType: "DB_OPERATION",
        Status: "warning",
        Message: "Stored procedure returned no recordset",
      });
    }
  } catch (error) {
    await logErrorToDatabase(error, "DB_OPERATION");
    throw error;
  }
}

/* ============================================================
  DATA PROCESSING LOGIC (same as before)
============================================================ */
async function processIndiaMartData(payload) {
  try {
    if (payload.CODE === 200 && payload.STATUS === "SUCCESS") {
      const response = payload.RESPONSE;
      await logToDatabase({
        LogType: "WEBHOOK_RECEIVED",
        Status: "success",
        Message: "Valid IndiaMART payload received",
        ApiResponseCode: payload.CODE,
      });

      if (response) {
        // RESPONSE can be a single object or an array depending on IndiaMART configuration
        const leads = Array.isArray(response) ? response : [response];
        await insertLeadsToDatabase(leads);
      } else {
        await logToDatabase({
          LogType: "WEBHOOK_RECEIVED",
          Status: "info",
          Message: "No leads in payload",
        });
      }
    } else {
      await logToDatabase({
        LogType: "WEBHOOK_RECEIVED",
        Status: "error",
        Message: `Invalid IndiaMART response: ${payload.MESSAGE || "Unknown error"}`,
        ApiResponseCode: payload.CODE,
      });
    }
  } catch (err) {
    await logErrorToDatabase(err, "WEBHOOK_PROCESS");
  }
}

/* ============================================================
  MAIN WEBHOOK HANDLER
============================================================ */
export const indiaMartWebhook = async (req, res) => {
  try {
    const payload = req.body;
    // console.log("Received IndiaMART Webhook:", JSON.stringify(payload, null, 2));

    await logToDatabase({
      LogType: "WEBHOOK_RECEIVED",
      Status: "info",
      Message: "Webhook received from IndiaMART",
      Details: JSON.stringify(payload),
    });

    await processIndiaMartData(payload.body || payload);

    res.status(200).json({ message: "Webhook received successfully", timestamp: getTimestamp() });
  } catch (err) {
    await logErrorToDatabase(err, "WEBHOOK_HANDLER");
    res.status(500).json({ message: "Error processing webhook", error: err.message });
  }
};
