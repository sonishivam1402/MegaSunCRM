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
        const { data } = req.body
        const pool = await poolPromise;
        const result = await pool
            .request()
            .input("Name", sql.NVarChar(100), data.Name)
            .input("IsActive", sql.Bit, data.Status)
            .input("CreatedBy", sql.UniqueIdentifier, req.user.id)
            .execute("sp_CreateLeadSource");

        if (result.recordset[0].Success) {
            res.status(201).json(result.recordsets[0]);
        } else {
            res.json(result.recordsets[0]);
        }

    } catch (err) {
        console.error("Error in creating lead sources :", err);
        res.status(500).json({ message: "Server error" });
    }
}

// Update Lead Source
export const updateLeadSource = async (req, res, next) => {
    try {
        const { data } = req.body;
        const leadId = req.params.id;
        const pool = await poolPromise;
        const result = await pool
            .request()
            .input("LeadSourceId", sql.UniqueIdentifier, leadId)
            .input("Name", sql.NVarChar(100), data.Name)
            .input("IsActive", sql.Bit, data.Status)
            .input("ModifiedBy", sql.UniqueIdentifier, req.user.id)
            .execute("sp_UpdateLeadSource");

        if (result.recordset[0].Success) {
            res.status(201).json(result.recordsets[0]);
        } else {
            res.json(result.recordsets[0]);
        }

    } catch (err) {
        console.error("Error in updating lead sources :", err);
        res.status(500).json({ message: "Server error" });
    }
}

// Delete Lead Source
export const deleteLeadSource = async (req, res, next) => {
    try {
        const leadId = req.params.id;
        const pool = await poolPromise;
        const result = await pool
            .request()
            .input("LeadSourceId", sql.UniqueIdentifier, leadId)
            .input("ModifiedBy", sql.UniqueIdentifier, req.user.id)
            .execute("sp_DeleteLeadSource");

        res.json(result.recordsets[0]);

    } catch (err) {
        console.error("Error in deleting lead sources :", err);
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
        const { data } = req.body
        const pool = await poolPromise;
        const result = await pool
            .request()
            .input("Name", sql.NVarChar(100), data.Name)
            .input("IsActive", sql.Bit, data.Status)
            .input("CreatedBy", sql.UniqueIdentifier, req.user.id)
            .execute("sp_CreateLeadStatus");

        if (result.recordset[0].Success) {
            res.status(201).json(result.recordsets[0]);
        } else {
            res.json(result.recordsets[0]);
        }

    } catch (err) {
        console.error("Error in creating lead status :", err);
        res.status(500).json({ message: "Server error" });
    }
}

// Update Lead Status
export const updateLeadStatus = async (req, res, next) => {
    try {
        const { data } = req.body;
        const leadId = req.params.id;
        const pool = await poolPromise;
        const result = await pool
            .request()
            .input("LeadStatusId", sql.UniqueIdentifier, leadId)
            .input("Name", sql.NVarChar(100), data.Name)
            .input("IsActive", sql.Bit, data.Status)
            .input("ModifiedBy", sql.UniqueIdentifier, req.user.id)
            .execute("sp_UpdateLeadStatus");

        if (result.recordset[0].Success) {
            res.status(201).json(result.recordsets[0]);
        } else {
            res.json(result.recordsets[0]);
        }
    } catch (err) {
        console.error("Error in updating lead status :", err);
        res.status(500).json({ message: "Server error" });
    }
}

// Delete Lead Status
export const deleteLeadStatus = async (req, res, next) => {
    try {
        const leadId = req.params.id;
        const pool = await poolPromise;
        const result = await pool
            .request()
            .input("LeadStatusId", sql.UniqueIdentifier, leadId)
            .input("ModifiedBy", sql.UniqueIdentifier, req.user.id)
            .execute("sp_DeleteLeadStatus");

        res.json(result.recordsets[0]);

    } catch (err) {
        console.error("Error in deleting lead status :", err);
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
        const { data } = req.body
        const pool = await poolPromise;
        const result = await pool
            .request()
            .input("Name", sql.NVarChar(100), data.Name)
            .input("IsActive", sql.Bit, data.Status)
            .input("CreatedBy", sql.UniqueIdentifier, req.user.id)
            .execute("sp_CreateLeadType");

        if (result.recordset[0].Success) {
            res.status(201).json(result.recordsets[0]);
        } else {
            res.json(result.recordsets[0]);
        }
        
    } catch (err) {
        console.error("Error in creating lead type :", err);
        res.status(500).json({ message: "Server error" });
    }
}

// Update Lead types
export const updateLeadType = async (req, res, next) => {
    try {
        const { data } = req.body;
        console.log(data);
        const leadId = req.params.id;
        const pool = await poolPromise;
        const result = await pool
            .request()
            .input("LeadTypeId", sql.UniqueIdentifier, leadId)
            .input("Name", sql.NVarChar(100), data.Name)
            .input("IsActive", sql.Bit, data.Status)
            .input("ModifiedBy", sql.UniqueIdentifier, req.user.id)
            .execute("sp_UpdateLeadType");

        if (result.recordset[0].Success) {
            res.status(201).json(result.recordsets[0]);
        } else {
            res.json(result.recordsets[0]);
        }

    } catch (err) {
        console.error("Error in updating lead type :", err);
        res.status(500).json({ message: "Server error" });
    }
}

// Delete Lead Type
export const deleteLeadType = async (req, res, next) => {
    try {
        const leadId = req.params.id;
        const pool = await poolPromise;
        const result = await pool
            .request()
            .input("LeadTypeId", sql.UniqueIdentifier, leadId)
            .input("ModifiedBy", sql.UniqueIdentifier, req.user.id)
            .execute("sp_DeleteLeadType");

        res.json(result.recordsets[0]);

    } catch (err) {
        console.error("Error in deleting lead type :", err);
        res.status(500).json({ message: "Server error" });
    }
}