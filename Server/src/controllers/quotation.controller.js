import { sql, poolPromise } from "../database/db.js";
import { Parser } from "json2csv";

// Export Quotations
export const exportQuotations = async (req, res, next) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().execute("sp_GetAllQuotation");

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
    console.error("Error in exporting quotation details :", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get Quotations
export const getQuotations = async (req, res, next) => {
  try {
    const {
      search,
      offset = 0,
      limit = 10,
      type,
      assignedTo,
      userId
    } = req.query;

    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("SearchParameter", sql.NVarChar(100), search)
      .input("LimitParameter", sql.Int, parseInt(limit))
      .input("OffsetParameter", sql.Int, parseInt(offset))
      .input("IsDomestic", sql.Bit, parseInt(type))
      .input("AssignedTo", sql.UniqueIdentifier, assignedTo)
      .input("UserId", sql.UniqueIdentifier, userId)
      .execute("sp_GetQuotation");

    res.json(result.recordsets);
  } catch (err) {
    console.error("Error in fetching quotation deatils :", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get Quotation By Id
export const getQuotationById = async (req, res, next) => {
  try {
    const quotationId = req.params.id;
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("QuotationId", sql.UniqueIdentifier, quotationId)
      .execute("sp_GetQuotationByQuotationID");

    res.json(result.recordsets);
  } catch (err) {
    console.error("Error in fetching quotation deatils by Id :", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get Last FollowUp By Quotation Id
export const getFollowUpByQuotationId = async (req, res, next) => {
  try {
    const quotationId = req.params.id;
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("quotationid", sql.UniqueIdentifier, quotationId)
      .execute("sp_GetFollowupsByQuotationId");

    res.json(result.recordsets);
  } catch (err) {
    console.error(
      "Error in fetching follow up deatils by quotation Id :",
      err
    );
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Quotation by Id
export const deleteQuotationById = async (req, res, next) => {
  try {
    const quotationId = req.params.id;
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("QuotationId", sql.UniqueIdentifier, quotationId)
      .input("ModifiedBy", sql.UniqueIdentifier, req.user.id)
      .execute("sp_DeleteQuotationByQuotationId");

    const response = result.recordset[0];
    if (response.Success) {
      res.status(201).json(response);
    } else {
      res.status(200).json(response);
    }
  } catch (err) {
    console.error("Error in deleting quotation by Id :", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Create Quotation
export const createNewQuotation = async (req, res, next) => {
  try {
    const { data } = req.body;
    const pool = await poolPromise;

    const result = await pool
      .request()
      .input("LeadId", sql.UniqueIdentifier, data.leadId)
      .input("QuotationBy", sql.UniqueIdentifier, req.user.id)
      .input("QuotationDate", sql.Date, data.quotationDate)
      .input("ShippingCompanyName", sql.NVarChar(200), data.shippingCompanyName)
      .input("ShippingEmailAddress", sql.NVarChar(200), data.shippingEmailAddress)
      .input("ShippingAddress", sql.NVarChar(sql.MAX), data.shippingAddress)
      .input("ShippingCity", sql.NVarChar(100), data.shippingCity)
      .input("ShippingState", sql.NVarChar(100), data.shippingState)
      .input("ShippingPincode", sql.NVarChar(20), data.shippingPincode)
      .input("ShippingCountry", sql.NVarChar(100), data.shippingCountry)
      .input("IsDomestic", sql.Bit, data.isDomestic)
      .input("Currency", sql.NVarChar(3), data.currency)
      .input("ExpectedDispatchDays", sql.Int, data.expectedDispatchDays)
      .input("PaymentTerms", sql.NVarChar(100), data.paymentTerms)
      .input("Notes", sql.NVarChar(sql.MAX), data.notes)
      .input("Terms", sql.NVarChar(100), data.terms)
      .input("TaxFormat", sql.NVarChar(100), data.taxFormat)
      .input("BasicAmount", sql.Decimal(18, 2), data.basicAmount)
      .input("Discount", sql.Decimal(18, 2), data.discount)
      .input("Total", sql.Decimal(18, 2), data.total)
      .input("SGST", sql.Decimal(18, 2), data.sgst)
      .input("CGST", sql.Decimal(18, 2), data.cgst)
      .input("IGST", sql.Decimal(18, 2), data.igst)
      .input("Tax", sql.Decimal(18, 2), data.tax)
      .input("RoundOff", sql.Decimal(18, 2), data.roundOff)
      .input("GrandTotal", sql.Decimal(18, 2), data.grandTotal)
      .input("FinalAmount", sql.Decimal(18, 2), data.finalAmount)
      .input("CreatedBy", sql.UniqueIdentifier, req.user.id)
      .input("ProductMappings", sql.NVarChar(sql.MAX), data.productMappings)
      .execute("sp_CreateQuotation");

    const response = result.recordset[0];
    // console.log(response);
    if (response.Success) {
      res.status(201).json(response);
    } else {
      res.status(200).json(response);
    }
  } catch (err) {
    console.error("Error in creating new quotation :", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update Quotation By Id
export const updateQuotationById = async (req, res, next) => {
  try {
    const quotationId = req.params.id;
    const { data } = req.body;
    const pool = await poolPromise;

    const result = await pool
      .request()
      .input("QuotationId", sql.UniqueIdentifier, quotationId)
      .input("QuotationBy", sql.UniqueIdentifier, data.quotationBy)
      .input("QuotationDate", sql.Date, data.quotationDate)
      .input("ShippingCompanyName", sql.NVarChar(200), data.shippingCompanyName)
      .input("ShippingEmailAddress", sql.NVarChar(200), data.shippingEmailAddress)
      .input("ShippingAddress", sql.NVarChar(sql.MAX), data.shippingAddress)
      .input("ShippingCity", sql.NVarChar(100), data.shippingCity)
      .input("ShippingState", sql.NVarChar(100), data.shippingState)
      .input("ShippingPincode", sql.NVarChar(20), data.shippingPincode)
      .input("ShippingCountry", sql.NVarChar(100), data.shippingCountry)
      .input("IsDomestic", sql.Bit, data.isDomestic)
      .input("Currency", sql.NVarChar(3), data.currency)
      .input("ExpectedDispatchDays", sql.Int, data.expectedDispatchDays)
      .input("PaymentTerms", sql.NVarChar(100), data.paymentTerms)
      .input("Notes", sql.NVarChar(sql.MAX), data.notes)
      .input("Terms", sql.NVarChar(100), data.terms)
      .input("TaxFormat", sql.NVarChar(100), data.taxFormat)
      .input("BasicAmount", sql.Decimal(18, 2), data.basicAmount)
      .input("Discount", sql.Decimal(18, 2), data.discount)
      .input("Total", sql.Decimal(18, 2), data.total)
      .input("SGST", sql.Decimal(18, 2), data.sgst)
      .input("CGST", sql.Decimal(18, 2), data.cgst)
      .input("IGST", sql.Decimal(18, 2), data.igst)
      .input("Tax", sql.Decimal(18, 2), data.tax)
      .input("RoundOff", sql.Decimal(18, 2), data.roundOff)
      .input("GrandTotal", sql.Decimal(18, 2), data.grandTotal)
      .input("FinalAmount", sql.Decimal(18, 2), data.finalAmount)
      .input("ModifiedBy", sql.UniqueIdentifier, req.user.id)
      .input("ProductMappings", sql.NVarChar(sql.MAX), data.productMappings)
      .execute("sp_UpdateQuotationByQuotationId");

    const response = result.recordset[0];
    // console.log(response);
    if (response.Success) {
      res.status(201).json(response);
    } else {
      res.status(200).json(response);
    }
  } catch (err) {
    console.error("Error in updating quotation :", err);
    res.status(500).json({ message: "Server error" });
  }
};