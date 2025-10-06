import { sql, poolPromise } from "../database/db.js";
import validator from "validator";
import { Parser } from "json2csv";

// Create Lead
export const createLead = async (req, res, next) => {
  try {
    const { lead } = req.body;

    const isEmailValid = validator.isEmail(lead.email);

    const isContactValid = validator.isMobilePhone(lead.contact, 'any');

    if (!isEmailValid && !isContactValid) {
      return res.json({ message: "Please check email and contact details." });
    }

    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("Name", sql.NVarChar(100), lead.name)
      .input("Contact", sql.NVarChar(100), lead.contact)
      .input("Email", sql.NVarChar(100), lead.email)
      .input("City", sql.NVarChar(100), lead.city)
      .input("State", sql.NVarChar(100), lead.state)
      .input("Country", sql.NVarChar(100), lead.country)
      .input("Address", sql.NVarChar(100), lead.address)
      .input("Pincode", sql.NVarChar(100), lead.pincode)
      .input("GSTNumber", sql.NVarChar(100), lead.gst)
      // .input("LeadStatus", sql.UniqueIdentifier, lead.leadStatusId)
      .input("LeadType", sql.UniqueIdentifier, lead.leadTypeId)
      .input("LeadSource", sql.UniqueIdentifier, lead.leadSourceId)
      .input("AssignedTo", sql.UniqueIdentifier, lead.userId)
      .input("CreatedBy", sql.UniqueIdentifier, req.user.id)
      .input(
        "ProductMappings",
        sql.NVarChar(sql.MAX),
        JSON.stringify(lead.productMappings)
      )
      .execute("sp_CreateLead");
    
    // console.log(result.recordsets);
    if (result.recordset[0].Success) {
      res.status(201).json(result.recordsets[0]);
    } else {
      res.json(result.recordsets[0]);
    }
  } catch (err) {
    console.error("Error in creating lead :", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update Lead By Id
export const updateLeadById = async (req, res, next) => {
  try {
    const { lead } = req.body;
    const leadId = req.params.id;

    const isEmailValid = validator.isEmail(lead.email);

    const isContactValid = validator.isMobilePhone(lead.contact, 'any');

    if (!isEmailValid && !isContactValid) {
      return res.json({ message: "Please check email and contact details." });
    }

    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("LeadId", sql.UniqueIdentifier, leadId)
      .input("Name", sql.NVarChar(100), lead.name)
      .input("Contact", sql.NVarChar(100), lead.contact)
      .input("Email", sql.NVarChar(100), lead.email)
      .input("City", sql.NVarChar(100), lead.city)
      .input("State", sql.NVarChar(100), lead.state)
      .input("Country", sql.NVarChar(100), lead.country)
      .input("Address", sql.NVarChar(100), lead.address)
      .input("Pincode", sql.NVarChar(100), lead.pincode)
      .input("GSTNumber", sql.NVarChar(100), lead.gst)
      .input("LeadStatus", sql.UniqueIdentifier, lead.leadStatusId)
      .input("LeadType", sql.UniqueIdentifier, lead.leadTypeId)
      .input("LeadSource", sql.UniqueIdentifier, lead.leadSourceId)
      .input("AssignedTo", sql.UniqueIdentifier, lead.userId)
      .input("ModifiedBy", sql.UniqueIdentifier, req.user.id)
      .input(
        "ProductMappings",
        sql.NVarChar(sql.MAX),
        JSON.stringify(lead.productMappings)
      )
      .execute("sp_UpdateLeadByLeadId");

    if (result.recordset[0].Success) {
      res.status(201).json(result.recordsets[0]);
    } else {
      res.json(result.recordsets[0]);
    }
  } catch (err) {
    console.error("Error in updating lead :", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all leads
export const getAllLeads = async (req, res, next) => {
  try {
    const {
      search = "",
      limit = 10,
      offset = 0,
      status,
      leadTypeId,
      sourceId
    } = req.query;
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("SearchParameter", sql.NVarChar(100), search)
      .input("LimitParameter", sql.Int, parseInt(limit))
      .input("OffsetParameter", sql.Int, parseInt(offset))
      .input("StatusParam", sql.UniqueIdentifier, status)
      .input("LeadTypeId", sql.UniqueIdentifier, leadTypeId)
      .input("LeadSourceId", sql.UniqueIdentifier, sourceId)
      .execute("sp_GetLeads");

    res.json(result.recordsets);
  } catch (err) {
    console.error("Error in fetching all leads :", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all unassigned leads
export const getAllUnassignedLeads = async (req, res, next) => {
  try {
    const {
      search = "",
      limit = 10,
      offset = 0,
      status,
      leadTypeId,
    } = req.query;
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("SearchParameter", sql.NVarChar(100), search)
      .input("LimitParameter", sql.Int, parseInt(limit))
      .input("OffsetParameter", sql.Int, parseInt(offset))
      .input("StatusParam", sql.UniqueIdentifier, status)
      .input("LeadTypeId", sql.UniqueIdentifier, leadTypeId)
      .execute("sp_GetUnAssignedLeads");

    res.json(result.recordsets);
  } catch (err) {
    console.error("Error in fetching all leads :", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get Lead by Id
export const getLeadById = async (req, res, next) => {
  try {
    const leadId = req.params.id;
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("LeadId", sql.UniqueIdentifier, leadId)
      .execute("sp_GetLeadByLeadId");

    res.json(result.recordsets);
  } catch (err) {
    console.error("Error in fetching lead deatils :", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all lead sources
export const getLeadSources = async (req, res, next) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().execute("sp_GetLeadSource");

    res.json(result.recordsets);
  } catch (err) {
    console.error("Error in fetching all lead sources :", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Create Lead Source
export const createLeadSource = async (req, res, next) => {
  try {
    const { data } = req.body;
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
};

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
};

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
};

// Get all lead status
export const getLeadStatus = async (req, res, next) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().execute("sp_GetLeadStatus");

    res.json(result.recordsets);
  } catch (err) {
    console.error("Error in fetching all lead status :", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Create Lead Status
export const createLeadStatus = async (req, res, next) => {
  try {
    const { data } = req.body;
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
};

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
};

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
};

// Get all lead types
export const getLeadTypes = async (req, res, next) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().execute("sp_GetLeadType");

    res.json(result.recordsets);
  } catch (err) {
    console.error("Error in fetching all lead types :", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Create Lead types
export const createLeadType = async (req, res, next) => {
  try {
    const { data } = req.body;
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
};

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
};

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
};

// Get DD Lead Sources
export const getLeadSourcesForDropdown = async (req, res, next) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().execute("sp_GetLeadSourceForLeadDDN");

    res.json(result.recordsets);
  } catch (err) {
    console.error("Error in fetching all lead sources :", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get DD Lead Types
export const getLeadTypesForDropdown = async (req, res, next) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().execute("sp_GetLeadTypeForLeadDDN");

    res.json(result.recordsets);
  } catch (err) {
    console.error("Error in fetching all lead types :", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get DD Lead Status
export const getLeadStatusForDropdown = async (req, res, next) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().execute("sp_GetLeadStatusForLeadDDN");

    res.json(result.recordsets);
  } catch (err) {
    console.error("Error in fetching all lead status :", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Lead by Id
export const deleteLead = async (req, res, next) => {
  try {
    const leadId = req.params.id;
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("LeadId", sql.UniqueIdentifier, leadId)
      .input("ModifiedBy", sql.UniqueIdentifier, req.user.id)
      .execute("sp_DeleteLeadsByLeadId");

    res.json(result.recordsets[0]);
  } catch (err) {
    console.error("Error in deleting lead :", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get DD Lead Status
export const getLeadsForDropdown = async (req, res, next) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().execute("sp_GetLeadsForDDN");

    res.json(result.recordsets);
  } catch (err) {
    console.error("Error in fetching all leads for dropdown :", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Export Leads
export const exportLeads = async (req, res, next) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().execute("sp_GetAllLeads");

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
    console.error("Error in exporting leads deatils :", err);
    res.status(500).json({ message: "Server error" });
  }
};