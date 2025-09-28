import { sql, poolPromise } from "../database/db.js";

// Get all FollowUps
export const getFollowUps = async (req, res, next) => {
  try {
    const { filter } = req.body;
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("FilterType", sql.NVarChar(50), filter)
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
      .input("LeadStatusId", sql.UniqueIdentifier, leadStatusId)
      .input("Comments", sql.NVarChar(50), comment)
      .input("NextFollowUpDate", sql.Date, nextFollowUpDate)
      .input("CreatedBy", sql.UniqueIdentifier, req.user.id)
      .execute("sp_CreateNewFollowup");

    res.json(result.recordsets);
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
      .input("LeadId", sql.NVarChar(50), leadId)
      .execute("sp_GetFollowupsByLeadId");

    res.json(result.recordsets);
  } catch (err) {
    console.error("Error in fetching follow-up deatils by leadId :", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update FollowUp Comment
export const updateFollowUpComment = async (req, res, next) => {
  try {
    const followUpId = req.params.id;
    const {comment} = req.body;
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("FollowUpId", sql.NVarChar(50), followUpId)
      .input("Comments", sql.NVarChar(50), comment)
      .input("ModifiedBy", sql.UniqueIdentifier, req.user.id)
      .execute("sp_EditFollowupComments");

    res.json(result.recordsets);
  } catch (err) {
    console.error("Error in updating follow-up comment :", err);
    res.status(500).json({ message: "Server error" });
  }
};
