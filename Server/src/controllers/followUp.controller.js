import { sql, poolPromise } from "../database/db.js";
import { Parser } from "json2csv";

// Get all FollowUps
export const getFollowUps = async (req, res, next) => {
  try {
    const { filter, limit = 10, offset = 0 } = req.query;
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("FilterType", sql.NVarChar(50), filter)
      .input("LimitParameter", sql.Int, parseInt(limit))
      .input("OffsetParameter", sql.Int, parseInt(offset))
      .execute("sp_GetFollowups");

    res.json(result.recordsets);
  } catch (err) {
    console.error("Error in fetching follow-up deatils :", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Create New FollowUps
export const createNewFollowUp = async (req, res, next) => {
  try {
    const { leadId, leadStatusId, comment, nextFollowUpDate } = req.body;
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("LeadId", sql.UniqueIdentifier, leadId)
      .input("FollowupStatus", sql.UniqueIdentifier, leadStatusId)
      .input("Comments", sql.NVarChar(50), comment)
      .input("NextFollowUpDate", sql.Date, nextFollowUpDate)
      .input("CreatedBy", sql.UniqueIdentifier, req.user.id)
      .execute("sp_CreateNewFollowup");

    const response = result.recordset[0];
    if (response.Success) {
      res.status(201).json(response);
    } else {
      res.status(200).json(response); // Or 400 if it's a failure
    }
  } catch (err) {
    console.error("Error in creating new follow-up :", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get FollowUp By LeadId
export const getFollowUpByLeadId = async (req, res, next) => {
  try {
    const leadId = req.params.id;
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("LeadId", sql.UniqueIdentifier, leadId)
      .execute("sp_GetFollowupsByLeadId");

    res.json(result.recordsets);
  } catch (err) {
    console.error("Error in fetching follow-up deatils by leadId :", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get FollowUp By FollowUpId
export const getFollowUpByFollowUpId = async (req, res, next) => {
  try {
    const Id = req.params.id;
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("FollowUpId", sql.UniqueIdentifier, Id)
      .execute("sp_GetFollowupByFollowupId");

    res.json(result.recordsets);
  } catch (err) {
    console.error("Error in fetching follow-up deatils by Followup Id :", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update FollowUp Comment
export const updateFollowUpComment = async (req, res, next) => {
  try {
    const followUpId = req.params.id;
    const { comment } = req.body;
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("FollowUpId", sql.NVarChar(50), followUpId)
      .input("Comments", sql.NVarChar(), comment)
      .input("ModifiedBy", sql.UniqueIdentifier, req.user.id)
      .execute("sp_EditFollowupComments");

    const response = result.recordset[0];
    if (response.Success) {
      res.status(201).json(response);
    } else {
      res.status(200).json(response); // Or 400 if it's a failure
    }
  } catch (err) {
    console.error("Error in updating follow-up comment :", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete FollowUp By FollowUpId
export const deleteFollowUpByFollowUpId = async (req, res, next) => {
  try {
    const Id = req.params.id;
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("FollowUpId", sql.UniqueIdentifier, Id)
      .input("ModifiedBy", sql.UniqueIdentifier, req.user.id)
      .execute("sp_DeleteFollowupByFollowupId");

    const response = result.recordset[0];
    if (response.Success) {
      res.status(201).json(response);
    } else {
      res.status(200).json(response); // Or 400 if it's a failure
    }
  } catch (err) {
    console.error("Error in deleting follow-up deatils by Followup Id :", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Export Follow Ups
export const exportFollowUps = async (req, res, next) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().execute("sp_GetExportedFollowups");

    // Convert to CSV
    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(result.recordset);

    // Set headers for file download
    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=export_${Date.now()}.csv`
    );

    // Send CSV
    res.send(csv);
  } catch (err) {
    console.error("Error in exporting follow-up deatils :", err);
    res.status(500).json({ message: "Server error" });
  }
};
