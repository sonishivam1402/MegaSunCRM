import { sql, poolPromise } from "../database/db.js";

// Get all lead sources
export const getLeadSources = async (req, res, next) => {
    try {
        const pool = await poolPromise;
        const result = await pool
            .request()
            .execute("sp_GetLeadSource");

        res.json(result.recordsets);

    } catch (err) {
        console.error("Error in fetching all lead sources :", err);
        res.status(500).json({ message: "Server error" });
    }
};

// Create Lead Source
export const createLeadSource = async (req, res, next) => {
    try {
        const {name, isActive} = req.body
        const pool = await poolPromise;
        const result = await pool
            .request()
            .input("Name", sql.NVarChar(100), name)
            .input("IsActive", sql.Bit, isActive)
            .input("CreatedBy", sql.UniqueIdentifier, req.user.id)
            .execute("sp_CreateLeadSource");

        res.json(result.recordsets[0]);

    } catch (err) {
        console.error("Error in creating lead sources :", err);
        res.status(500).json({ message: "Server error" });
    }
}

// Update Lead Source
export const updateLeadSource = async (req, res, next) => {
    try {
        const {name, isActive} = req.body;
        const leadId = req.params.id;
        const pool = await poolPromise;
        const result = await pool
            .request()
            .input("LeadSourceId", sql.UniqueIdentifier, leadId)
            .input("Name", sql.NVarChar(100), name)
            .input("IsActive", sql.Bit, isActive)
            .input("ModifiedBy", sql.UniqueIdentifier, req.user.id)
            .execute("sp_UpdateLeadSource");

        res.json(result.recordsets[0]);

    } catch (err) {
        console.error("Error in updating lead sources :", err);
        res.status(500).json({ message: "Server error" });
    }
}

// Get all lead status
export const getLeadStatus = async (req, res, next) => {
    try {
        const pool = await poolPromise;
        const result = await pool
            .request()
            .execute("sp_GetLeadStatus");

        res.json(result.recordsets);

    } catch (err) {
        console.error("Error in fetching all lead status :", err);
        res.status(500).json({ message: "Server error" });
    }
};

// Create Lead Status
export const createLeadStatus = async (req, res, next) => {
    try {
        const {name, isActive} = req.body
        const pool = await poolPromise;
        const result = await pool
            .request()
            .input("Name", sql.NVarChar(100), name)
            .input("IsActive", sql.Bit, isActive)
            .input("CreatedBy", sql.UniqueIdentifier, req.user.id)
            .execute("sp_CreateLeadStatus");

        res.json(result.recordsets[0]);

    } catch (err) {
        console.error("Error in creating lead status :", err);
        res.status(500).json({ message: "Server error" });
    }
}

// Update Lead Status
export const updateLeadStatus = async (req, res, next) => {
    try {
        const {name, isActive} = req.body;
        const leadId = req.params.id;
        const pool = await poolPromise;
        const result = await pool
            .request()
            .input("LeadStatusId", sql.UniqueIdentifier, leadId)
            .input("Name", sql.NVarChar(100), name)
            .input("IsActive", sql.Bit, isActive)
            .input("ModifiedBy", sql.UniqueIdentifier, req.user.id)
            .execute("sp_UpdateLeadStatus");

        res.json(result.recordsets[0]);

    } catch (err) {
        console.error("Error in updating lead status :", err);
        res.status(500).json({ message: "Server error" });
    }
}

// Get all lead types
export const getLeadTypes = async (req, res, next) => {
    try {
        const pool = await poolPromise;
        const result = await pool
            .request()
            .execute("sp_GetLeadType");

        res.json(result.recordsets);

    } catch (err) {
        console.error("Error in fetching all lead types :", err);
        res.status(500).json({ message: "Server error" });
    }
};

// Create Lead types
export const createLeadType = async (req, res, next) => {
    try {
        const {name, isActive} = req.body
        const pool = await poolPromise;
        const result = await pool
            .request()
            .input("Name", sql.NVarChar(100), name)
            .input("IsActive", sql.Bit, isActive)
            .input("CreatedBy", sql.UniqueIdentifier, req.user.id)
            .execute("sp_CreateLeadType");

        res.json(result.recordsets[0]);

    } catch (err) {
        console.error("Error in creating lead type :", err);
        res.status(500).json({ message: "Server error" });
    }
}

// Update Lead types
export const updateLeadType = async (req, res, next) => {
    try {
        const {name, isActive} = req.body;
        const leadId = req.params.id;
        const pool = await poolPromise;
        const result = await pool
            .request()
            .input("LeadTypeId", sql.UniqueIdentifier, leadId)
            .input("Name", sql.NVarChar(100), name)
            .input("IsActive", sql.Bit, isActive)
            .input("ModifiedBy", sql.UniqueIdentifier, req.user.id)
            .execute("sp_UpdateLeadType");

        res.json(result.recordsets[0]);

    } catch (err) {
        console.error("Error in updating lead type :", err);
        res.status(500).json({ message: "Server error" });
    }
}