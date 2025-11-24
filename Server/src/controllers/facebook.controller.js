import axios from "axios";
import { sql, poolPromise } from "../database/db.js";
import { CREATED_BY_USER_ID, FB_VERIFY_TOKEN, FB_APP_ID, FB_APP_SECRET, FB_ACCESS_TOKEN_ENV, FB_GRAPH_API_VERSION, FACEBOOK_LEAD_SOURCE_NAME } from "../config/env.js";


/* Token cache (in-memory) */
let tokenCache = {
  token: FB_ACCESS_TOKEN_ENV || null,
  expiresAt: 0, // epoch ms
};

/* ============================================================
  UTILITY HELPERS
============================================================ */
function getTimestamp() {
  return new Date().toISOString();
}

function safeGet(obj, pathArr) {
  return pathArr.reduce(
    (acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined),
    obj
  );
}

/* ============================================================
  DB LOGGING HELPERS
============================================================ */
async function logFacebookInvoke({
  Status,
  Message = null,
  WebhookBody = null,
  Headers = null,
  LeadgenId = null,
  ErrorMessage = null,
  StackTrace = null,
  SourceIP = null,
  TriggeredBy = "WEBHOOK",
}) {
  try {
    const pool = await poolPromise;
    await pool.request()
      .input("Status", sql.NVarChar(50), Status)
      .input("Message", sql.NVarChar(1000), Message)
      .input("WebhookBody", sql.NVarChar(sql.MAX), WebhookBody)
      .input("Headers", sql.NVarChar(sql.MAX), Headers)
      .input("LeadgenId", sql.NVarChar(100), LeadgenId)
      .input("ErrorMessage", sql.NVarChar(1000), ErrorMessage)
      .input("StackTrace", sql.NVarChar(sql.MAX), StackTrace)
      .input("SourceIP", sql.NVarChar(100), SourceIP)
      .input("TriggeredBy", sql.NVarChar(100), TriggeredBy)
      .query(`
        INSERT INTO FacebookInvokeLogs (
          Status, Message, WebhookBody, Headers, LeadgenId,
          ErrorMessage, StackTrace, SourceIP, TriggeredBy
        )
        VALUES (
          @Status, @Message, @WebhookBody, @Headers, @LeadgenId,
          @ErrorMessage, @StackTrace, @SourceIP, @TriggeredBy
        );
      `);
  } catch (err) {
    console.error(`[${getTimestamp()}] ⚠️ Failed to log FacebookInvoke: ${err.message}`);
  }
}

async function logFacebookGraph({
  LeadgenId,
  GraphRequestUrl = null,
  GraphResponseCode = null,
  GraphResponseBody = null,
  ParsedFieldsJson = null,
  ParsedName = null,
  ParsedPhone = null,
  ParsedEmail = null,
  ParsedCity = null,
  ParsedState = null,
  ErrorMessage = null,
  StackTrace = null,
  TriggeredBy = "GRAPH_API",
}) {
  try {
    const pool = await poolPromise;
    await pool.request()
      .input("LeadgenId", sql.NVarChar(100), LeadgenId)
      .input("GraphRequestUrl", sql.NVarChar(1000), GraphRequestUrl)
      .input("GraphResponseCode", sql.Int, GraphResponseCode)
      .input("GraphResponseBody", sql.NVarChar(sql.MAX), GraphResponseBody)
      .input("ParsedFieldsJson", sql.NVarChar(sql.MAX), ParsedFieldsJson)
      .input("ParsedName", sql.NVarChar(200), ParsedName)
      .input("ParsedPhone", sql.NVarChar(100), ParsedPhone)
      .input("ParsedEmail", sql.NVarChar(200), ParsedEmail)
      .input("ParsedCity", sql.NVarChar(200), ParsedCity)
      .input("ParsedState", sql.NVarChar(200), ParsedState)
      .input("ErrorMessage", sql.NVarChar(1000), ErrorMessage)
      .input("StackTrace", sql.NVarChar(sql.MAX), StackTrace)
      .input("TriggeredBy", sql.NVarChar(100), TriggeredBy)
      .query(`
        INSERT INTO FacebookGraphLogs (
          LeadgenId, GraphRequestUrl, GraphResponseCode, GraphResponseBody,
          ParsedFieldsJson, ParsedName, ParsedPhone, ParsedEmail, ParsedCity,
          ParsedState, ErrorMessage, StackTrace, TriggeredBy
        )
        VALUES (
          @LeadgenId, @GraphRequestUrl, @GraphResponseCode, @GraphResponseBody,
          @ParsedFieldsJson, @ParsedName, @ParsedPhone, @ParsedEmail, @ParsedCity,
          @ParsedState, @ErrorMessage, @StackTrace, @TriggeredBy
        );
      `);
  } catch (err) {
    console.error(`[${getTimestamp()}] ⚠️ Failed to log FacebookGraph: ${err.message}`);
  }
}

/* ============================================================
  FB TOKEN MANAGEMENT
============================================================ */
async function debugToken(token) {
  if (!FB_APP_ID || !FB_APP_SECRET || !token) {
    return { valid: !!token, expiresAt: null };
  }

  try {
    const url = `https://graph.facebook.com/${FB_GRAPH_API_VERSION}/debug_token`;
    const appToken = `${FB_APP_ID}|${FB_APP_SECRET}`;

    const resp = await axios.get(url, {
      params: {
        input_token: token,
        access_token: appToken,
      },
      timeout: 10000,
    });

    const data = resp.data?.data || {};
    const expiresAt = data.expires_at ? data.expires_at * 1000 : null;

    return {
      valid: !!data.is_valid,
      expiresAt,
    };
  } catch (err) {
    console.error(`[${getTimestamp()}] ⚠️ debugToken error: ${err.message}`);
    return { valid: false, expiresAt: null };
  }
}

async function exchangeForLongLived(token) {
  if (!FB_APP_ID || !FB_APP_SECRET || !token) return null;
  try {
    const url = `https://graph.facebook.com/${FB_GRAPH_API_VERSION}/oauth/access_token`;
    const resp = await axios.get(url, {
      params: {
        grant_type: "fb_exchange_token",
        client_id: FB_APP_ID,
        client_secret: FB_APP_SECRET,
        fb_exchange_token: token,
      },
      timeout: 10000,
    });

    return resp.data?.access_token || null;
  } catch (err) {
    console.error(`[${getTimestamp()}] ⚠️ exchangeForLongLived error: ${err.message}`);
    return null;
  }
}

async function getValidAccessToken() {
  const now = Date.now();

  // If we have a token and it's not close to expiry, use it.
  if (tokenCache.token && tokenCache.expiresAt && tokenCache.expiresAt - 60000 > now) {
    return tokenCache.token;
  }

  if (!tokenCache.token) {
    // no token at all, we can try to use env one
    if (!FB_ACCESS_TOKEN_ENV) return null;
    tokenCache.token = FB_ACCESS_TOKEN_ENV;
  }

  const info = await debugToken(tokenCache.token);

  if (info.valid) {
    tokenCache.expiresAt = info.expiresAt || now + 3600 * 1000; // fallback 1h
    return tokenCache.token;
  }

  // try to exchange for long-lived token, then debug again
  const exchanged = await exchangeForLongLived(tokenCache.token);
  if (!exchanged) return null;

  const info2 = await debugToken(exchanged);
  if (info2.valid) {
    tokenCache.token = exchanged;
    tokenCache.expiresAt = info2.expiresAt || now + 3600 * 1000;
    return tokenCache.token;
  }

  return null;
}

/* ============================================================
  DB INSERTION FOR LEADS
============================================================ */
async function insertFacebookLeadsToDatabase(crmLeads) {
  // crmLeads = array of normalized objects ready for CRM
  if (!Array.isArray(crmLeads) || crmLeads.length === 0) return;

  const leadsJson = JSON.stringify(crmLeads);

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("LeadSourceName", sql.NVarChar(255), FACEBOOK_LEAD_SOURCE_NAME)
      .input("LeadsData", sql.NVarChar(sql.MAX), leadsJson)
      .input("CreatedBy", sql.UniqueIdentifier, CREATED_BY_USER_ID)
      .execute("sp_CreateAPIImportedBulkLeads");

    // optional: log inserted/duplicate counts via console
    if (result.recordset?.length) {
      const r = result.recordset[0];
      console.log(
        `[${getTimestamp()}] ✅ FB Leads inserted: Inserted=${r.InsertedCount}, Duplicates=${r.DuplicateCount}, Total=${r.TotalProcessed}, Status=${r.Status}`
      );
    } else {
      console.warn(
        `[${getTimestamp()}] ⚠️ FB SP returned no recordset (sp_CreateAPIImportedBulkLeads)`
      );
    }
  } catch (err) {
    console.error(`[${getTimestamp()}] ❌ Error inserting FB leads: ${err.message}`);
    // we intentionally don't throw to avoid FB retries
  }
}

/* ============================================================
  MAIN: WEBHOOK VERIFICATION (GET)
============================================================ */
export const facebookWebhookVerify = async (req, res) => {
  try {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === FB_VERIFY_TOKEN) {
      return res.status(200).send(challenge);
    }

    return res.status(403).send("Verification failed");
  } catch (err) {
    console.error(`[${getTimestamp()}] ❌ FB verify error: ${err.message}`);
    // even if error, FB only cares about code; 403 here
    return res.status(403).send("Verification failed");
  }
};

/* ============================================================
  MAIN: WEBHOOK HANDLER (POST)
============================================================ */
export const facebookWebhookLead = async (req, res) => {
  const timestamp = getTimestamp();
  const payload = req.body || {};
  const rawBody = JSON.stringify(payload);
  const headersJson = JSON.stringify(req.headers || {});
  const sourceIp =
    req.ip ||
    req.headers["x-forwarded-for"] ||
    req.socket?.remoteAddress ||
    null;

  // Extract leadgen_id from webhook payload
  const leadgenId = safeGet(payload, ["entry", 0, "changes", 0, "value", "leadgen_id"]);

  // Log invoke regardless of success/failure
  await logFacebookInvoke({
    Status: leadgenId ? "info" : "error",
    Message: leadgenId
      ? "Facebook Lead webhook received"
      : "Facebook Lead webhook received but no leadgen_id found",
    WebhookBody: rawBody,
    Headers: headersJson,
    LeadgenId: leadgenId,
    SourceIP: sourceIp,
  });

  // Always respond 200 to avoid FB retries; processing happens server-side
  res.status(200).json({
    message: "Facebook webhook received",
    leadgenId: leadgenId || null,
    timestamp,
  });

  if (!leadgenId) {
    return;
  }

  // Now fetch full lead from Graph API
  let graphUrl = null;
  let graphStatusCode = null;
  let graphBodyJson = null;
  let parsedFields = null;
  let parsedName = null;
  let parsedPhone = null;
  let parsedEmail = null;
  let parsedCity = null;
  let parsedState = null;
  let errorMessage = null;
  let stackTrace = null;

  try {
    const token = await getValidAccessToken();
    if (!token) {
      errorMessage = "No valid Facebook access token available";
      await logFacebookGraph({
        LeadgenId: leadgenId,
        GraphRequestUrl: null,
        GraphResponseCode: null,
        GraphResponseBody: null,
        ParsedFieldsJson: null,
        ErrorMessage: errorMessage,
      });
      return;
    }

    graphUrl = `https://graph.facebook.com/${FB_GRAPH_API_VERSION}/${leadgenId}`;
    const fields =
      "id,created_time,field_data,ad_id,adset_id,campaign_id,form_id,page_id";

    const resp = await axios.get(graphUrl, {
      params: { access_token: token, fields },
      timeout: 10000,
    });

    graphStatusCode = resp.status;
    graphBodyJson = JSON.stringify(resp.data || {});

    const lead = resp.data || {};

    // Convert field_data to simple key/value map
    const fieldMap = {};
    (lead.field_data || []).forEach((f) => {
      const key = f.name;
      const value = Array.isArray(f.values) ? f.values[0] : f.values;
      fieldMap[key] = value;
    });

    parsedFields = fieldMap;
    parsedName = fieldMap.full_name || null;
    parsedPhone = fieldMap.phone_number || null;
    parsedEmail = fieldMap.email || null;
    parsedCity = fieldMap.city || null;
    parsedState = fieldMap.state || null;

    // Log Graph call
    await logFacebookGraph({
      LeadgenId: leadgenId,
      GraphRequestUrl: graphUrl,
      GraphResponseCode: graphStatusCode,
      GraphResponseBody: graphBodyJson,
      ParsedFieldsJson: JSON.stringify(fieldMap),
      ParsedName: parsedName,
      ParsedPhone: parsedPhone,
      ParsedEmail: parsedEmail,
      ParsedCity: parsedCity,
      ParsedState: parsedState,
    });

    // Build CRM lead object (one lead per webhook)
    const crmLead = {
      // Core CRM fields (you can extend as per your SP logic)
      LeadgenId: leadgenId,
      CreatedTime: lead.created_time || null,

      Name: parsedName,
      Contact: parsedPhone,
      Email: parsedEmail,
      City: parsedCity,
      State: parsedState,
      Country: fieldMap.country || null,
      Address: fieldMap.street_address || null,
      Pincode: fieldMap.zip_code || null,
      AlternateNumber: fieldMap.alternate_number || null,

      // Raw data for downstream use if needed
      RawFieldData: fieldMap,
      AdId: lead.ad_id || null,
      AdsetId: lead.adset_id || null,
      CampaignId: lead.campaign_id || null,
      FormId: lead.form_id || null,
      PageId: lead.page_id || null,
    };

    await insertFacebookLeadsToDatabase([crmLead]);
  } catch (err) {
    errorMessage = err.message;
    stackTrace = err.stack;

    await logFacebookGraph({
      LeadgenId: leadgenId,
      GraphRequestUrl: graphUrl,
      GraphResponseCode: graphStatusCode,
      GraphResponseBody: graphBodyJson,
      ParsedFieldsJson: parsedFields ? JSON.stringify(parsedFields) : null,
      ParsedName: parsedName,
      ParsedPhone: parsedPhone,
      ParsedEmail: parsedEmail,
      ParsedCity: parsedCity,
      ParsedState: parsedState,
      ErrorMessage: errorMessage,
      StackTrace: stackTrace,
    });
  }
};
