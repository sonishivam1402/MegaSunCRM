import { sql, poolPromise } from "../database/db.js";
import validator from "validator";
import { Parser } from "json2csv";

// Create Lead
export const createLead = async (req, res, next) => {
  try {
    const { lead } = req.body;

    if (lead.contact.startsWith("+91")) {
      const phone = lead.contact.replace(/\D/g, "");
      const isContactValid = validator.isMobilePhone(phone, "en-IN");

      if (!isContactValid) {
        return res.json({ Message: "Please check contact details." });
      }
    }
    if (lead.alternateContact && lead.alternateContact.startsWith("+91")) {
      const altPhone = lead.alternateContact.replace(/\D/g, "");
      const isAltContactValid = validator.isMobilePhone(altPhone, "en-IN");

      if (!isAltContactValid) {
        return res.json({ Message: "Please check alternate contact details." });
      }
    }

    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("Name", sql.NVarChar(100), lead.name)
      .input("Contact", sql.NVarChar(100), lead.contact)
      .input("AlternateNumber", sql.NVarChar(100), lead.alternateContact)
      .input("Email", sql.NVarChar(100), lead.email)
      .input("City", sql.NVarChar(100), lead.city)
      .input("State", sql.NVarChar(100), lead.state)
      .input("Country", sql.NVarChar(100), lead.country)
      .input("Address", sql.NVarChar(sql.MAX), lead.address)
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

    if (lead.contact.startsWith("+91")) {
      const phone = lead.contact.replace(/\D/g, "");
      const isContactValid = validator.isMobilePhone(phone, "en-IN");

      if (!isContactValid) {
        return res.json({ Message: "Please check contact details." });
      }
    }
    if (lead.alternateContact && lead.alternateContact.startsWith("+91")) {
      const altPhone = lead.alternateContact.replace(/\D/g, "");
      const isAltContactValid = validator.isMobilePhone(altPhone, "en-IN");

      if (!isAltContactValid) {
        return res.json({ Message: "Please check alternate contact details." });
      }
    }

    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("LeadId", sql.UniqueIdentifier, leadId)
      .input("Name", sql.NVarChar(100), lead.name)
      .input("Contact", sql.NVarChar(100), lead.contact)
      .input("AlternateNumber", sql.NVarChar(100), lead.alternateContact)
      .input("Email", sql.NVarChar(100), lead.email)
      .input("City", sql.NVarChar(100), lead.city)
      .input("State", sql.NVarChar(100), lead.state)
      .input("Country", sql.NVarChar(100), lead.country)
      .input("Address", sql.NVarChar(sql.MAX), lead.address)
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
      .execute("sp_UpdateLeadByLeadId_v1");

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
      sourceId,
      userId,
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
      .input("UserId", sql.UniqueIdentifier, userId)
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
      sourceId,
    } = req.query;
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("SearchParameter", sql.NVarChar(100), search)
      .input("LimitParameter", sql.Int, parseInt(limit))
      .input("OffsetParameter", sql.Int, parseInt(offset))
      .input("StatusParam", sql.UniqueIdentifier, status)
      .input("LeadTypeId", sql.UniqueIdentifier, leadTypeId)
      .input("SourceParameter", sql.UniqueIdentifier, sourceId)
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
    // console.log(data);
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
    const result = await pool
      .request()
      .input("UserId", sql.UniqueIdentifier, req.user.id)
      .execute("sp_GetLeadsForDDN");

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

// Import Leads
export const importLeads = async (req, res, next) => {
  const { leads, assignedTo } = req.body;

  if (!leads || !Array.isArray(leads) || leads.length === 0) {
    return res.status(400).json({
      message: "Invalid data format. Expected array of lead objects.",
    });
  }

  if (!assignedTo) {
    return res.status(400).json({
      message: "Assign leads to someone.",
    });
  }

  try {
    const pool = await poolPromise;

    // Convert to JSON string for the stored procedure
    const leadsJson = JSON.stringify(leads);

    const result = await pool
      .request()
      .input("LeadsJSON", sql.NVarChar(sql.MAX), leadsJson)
      .input("AssignedTo", sql.UniqueIdentifier, assignedTo)
      .input("CreatedBy", sql.UniqueIdentifier, req.user.id)
      .execute("sp_CreateBulkImportedLeads");

    // Process the recordsets returned by SP
    const recordsets = result.recordsets;

    if (!recordsets || recordsets.length === 0) {
      return res.status(500).json({
        message: "No response from database",
      });
    }

    // First recordset typically contains summary info
    const summary = recordsets[0][0] || {};

    // Second recordset (if exists) contains failed leads
    const failedLeads = recordsets[1] || [];

    const response = {
      successCount: summary.SuccessCount || 0,
      failedCount: summary.FailedCount || 0,
      totalCount: summary.TotalLeads || leads.length,
      failedLeads: failedLeads.map((lead) => ({
        rowNumber: lead.RowNumber,
        CompanyName: lead.CompanyName,
        Contact: lead.Contact,
        errorMessage: lead.ErrorMessage,
      })),
    };

    return res.json(response);
  } catch (error) {
    console.error("Import error:", error);
    return res.status(500).json({
      message: error.message || "Failed to import leads",
    });
  }
};

// Transfer Leads
export const transferLeads = async (req, res, next) => {
  try {
    const { data } = req.body;
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("AssignedTo", sql.UniqueIdentifier, data.selectedUser)
      .input("ModifiedBy", sql.UniqueIdentifier, req.user.id)
      .input("LeadIdList", sql.NVarChar(sql.MAX), JSON.stringify(data.leadIds))
      .execute("sp_TransferAssignedLeads");

    res.json(result.recordsets[0]);
  } catch (err) {
    console.error("Error in transfering lead :", err);
    res.status(500).json({ message: "Server error" });
  }
};
