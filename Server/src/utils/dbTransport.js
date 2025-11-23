import Transport from "winston-transport";
import { sql, poolPromise } from "../database/db.js";

class MSSQLErrorTransport extends Transport {
  async log(info, callback) {
    // Only store error logs
    if (info.level !== "error") return callback();
    if (info.source === "request") return callback();

    const {
      level,
      message,
      ErrorMessage,
      StackTrace,
      FilePath,
      MethodName,
      LineNumber,
      UserId,
      RequestId,
      RequestUrl,
      RequestMethod,
      RequestBody,
      ResponseStatus,
      AdditionalData,
    } = info;

    try {
      const pool = await poolPromise;

      await pool
        .request()
        .input("LogLevel", sql.NVarChar, level)
        .input("Message", sql.NVarChar, message || null)
        .input("ErrorMessage", sql.NVarChar, ErrorMessage || null)
        .input("StackTrace", sql.NVarChar, StackTrace || null)
        .input("FilePath", sql.NVarChar, FilePath || null)
        .input("MethodName", sql.NVarChar, MethodName || null)
        .input("LineNumber", sql.Int, LineNumber || null)
        .input("UserId", sql.UniqueIdentifier, UserId || null)
        .input("RequestId", sql.NVarChar, RequestId || null)
        .input("RequestUrl", sql.NVarChar, RequestUrl || null)
        .input("RequestMethod", sql.NVarChar, RequestMethod || null)
        .input(
          "RequestBody",
          sql.NVarChar,
          RequestBody ? JSON.stringify(RequestBody) : null
        )
        .input("ResponseStatus", sql.Int, ResponseStatus || null)
        .input(
          "AdditionalData",
          sql.NVarChar,
          AdditionalData ? JSON.stringify(AdditionalData) : null
        ).query(`
          INSERT INTO [dbo].[ErrorLogs]
          (LogLevel, Message, ErrorMessage, StackTrace, FilePath, MethodName, LineNumber, UserId,
           RequestId, RequestUrl, RequestMethod, RequestBody, ResponseStatus, AdditionalData)
          VALUES
          (@LogLevel, @Message, @ErrorMessage, @StackTrace, @FilePath, @MethodName, @LineNumber,
           @UserId, @RequestId, @RequestUrl, @RequestMethod, @RequestBody, @ResponseStatus, @AdditionalData)
        `);

      callback();
    } catch (err) {
      console.error("Failed to write log to DB:", err);
      callback(err);
    }
  }
}

export default MSSQLErrorTransport;
