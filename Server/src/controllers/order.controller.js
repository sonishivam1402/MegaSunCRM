import { sql, poolPromise } from "../database/db.js";
import { Parser } from "json2csv";

// Export Orders
export const exportOrders = async (req, res, next) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().execute("sp_GetAllOrder");

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
    console.error("Error in exporting order details :", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get Orders
export const getOrders = async (req, res, next) => {
  try {
    const {
      search,
      offset = 0,
      limit = 10,
      type,
      assignedTo,
    } = req.query;

    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("SearchParameter", sql.NVarChar(100), search)
      .input("LimitParameter", sql.Int, parseInt(limit))
      .input("OffsetParameter", sql.Int, parseInt(offset))
      .input("IsDomestic", sql.Bit, parseInt(type))
      .input("AssignedTo", sql.UniqueIdentifier, assignedTo)
      .input("UserId", sql.UniqueIdentifier, req.user.id)
      .execute("sp_GetOrder");

    res.json(result.recordsets);
  } catch (err) {
    console.error("Error in fetching order deatils :", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get Order By Id
export const getOrderById = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("OrderId", sql.UniqueIdentifier, orderId)
      .execute("sp_GetOrderByOrderId");

    res.json(result.recordsets);
  } catch (err) {
    console.error("Error in fetching order deatils by Id :", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get Last FollowUp By Order Id
export const getFollowUpByOrderId = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("orderid", sql.UniqueIdentifier, orderId)
      .execute("sp_GetFollowupsByOrderId");

    res.json(result.recordsets);
  } catch (err) {
    console.error(
      "Error in fetching follow up deatils by order Id :",
      err
    );
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Order by Id
export const deleteOrderById = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("OrderId", sql.UniqueIdentifier, orderId)
      .input("ModifiedBy", sql.UniqueIdentifier, req.user.id)
      .execute("sp_DeleteOrderByOrderId");

    const response = result.recordset[0];
    if (response.Success) {
      res.status(201).json(response);
    } else {
      res.status(200).json(response);
    }
  } catch (err) {
    console.error("Error in deleting order by Id :", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Dispatch Order by Id
export const dispatchOrderById = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("DispatchStatus", sql.Bit, 1)
      .input("OrderId", sql.UniqueIdentifier, orderId)
      .input("ModifiedBy", sql.UniqueIdentifier, req.user.id)
      .execute("sp_UpdateOrderDispatchStatus");

    const response = result.recordset[0];
    if (response.Success) {
      res.status(201).json(response);
    } else {
      res.status(200).json(response);
    }
  } catch (err) {
    console.error("Error in dispatching order by Id :", err);
    res.status(500).json({ message: "Server error" });
  }
};


// Create Order
export const createNewOrder = async (req, res, next) => {
    try {
      const { data } = req.body;
      const pool = await poolPromise;
  
      const result = await pool
        .request()
        .input("LeadId", sql.UniqueIdentifier, data.leadId)
        .input("OrderBy", sql.UniqueIdentifier, req.user.id)
        .input("OrderDate", sql.Date, data.orderDate)
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
        .execute("sp_CreateOrder");
  
      const response = result.recordset[0];
      // console.log(response);
      if (response.Success) {
        res.status(201).json(response);
      } else {
        res.status(200).json(response);
      }
    } catch (err) {
      console.error("Error in creating new order :", err);
      res.status(500).json({ message: "Server error" });
    }
  };
  
  // Update Order By Id
  export const updateOrderById = async (req, res, next) => {
    try {
      const orderId = req.params.id;
      const { data } = req.body;
      const pool = await poolPromise;
  
      const result = await pool
        .request()
        .input("OrderId", sql.UniqueIdentifier, orderId)
        .input("OrderBy", sql.UniqueIdentifier, data.orderBy)
        .input("OrderDate", sql.Date, data.orderDate)
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
        .execute("sp_UpdateOrderByOrderId");
  
      const response = result.recordset[0];
      // console.log(response);
      if (response.Success) {
        res.status(201).json(response);
      } else {
        res.status(200).json(response);
      }
    } catch (err) {
      console.error("Error in updating order :", err);
      res.status(500).json({ message: "Server error" });
    }
  };