import { sql, poolPromise } from "../database/db.js";
import bcrypt from "bcryptjs";
import uploadFile from '../database/s3.js';
import validateBit from "../utils/validateBit.js";

// Create New User
export const createNewUser = async (req, res, next) => {
  try {
    const data = req.body;
    let fileUrl = null;

    if (req.file) {
      const uploadResult = await uploadFile(req.file);
      fileUrl = uploadResult.Location;
      //console.log("File Url : ", fileUrl);
    }

    const hashPassword = await bcrypt.hash(data.password, 10);
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("Name", sql.NVarChar(100), data.name)
      .input("Email", sql.NVarChar(100), data.email)
      .input("Password", sql.NVarChar(100), data.password)
      .input("UserTypeId", sql.NVarChar(100), data.userTypeId)
      .input("HashPassword", sql.NVarChar(sql.MAX), hashPassword)
      .input("Contact", sql.NVarChar(20), data.contact.toString())
      .input("ProfileImagePath", sql.NVarChar(sql.MAX), fileUrl)
      .input("Designation", sql.NVarChar(sql.MAX), data.designation)
      .input("GSTId", sql.NVarChar(100), data.gst)
      .input("Address", sql.NVarChar(sql.MAX), data.address)
      .input("CreatedBy", sql.UniqueIdentifier, req.user.id)
      .input("ModifiedBy", sql.UniqueIdentifier, req.user.id)
      .execute("sp_CreateNewUser");

    if (result.recordset[0].Success) {
      res.status(201).json(result.recordset[0]);
    } else {
      res.json(result.recordset[0]);
    }

  } catch (err) {
    console.error("Error in creating new user :", err);
    res.status(500).json({ message: "Server error" });
  }
};

// All Users
export const getAllUsers = async (req, res, next) => {
  try {
    const { search = "", limit = 10, offset = 0 } = req.query;
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("SearchParameter", sql.NVarChar(100), search)
      .input("LimitParameter", sql.Int, parseInt(limit))
      .input("OffsetParameter", sql.Int, parseInt(offset))
      .execute("sp_GetUsers");

    res.json({users : result.recordsets[0], totalRecords:result.recordsets[1]});

  } catch (err) {
    console.error("Error in fetching all users :", err);
    res.status(500).json({ message: "Server error" });
  }
};

// User by Id
export const getUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("UserId", sql.UniqueIdentifier, userId)
      .execute("sp_GetUserByUserId");

    res.json(result.recordset[0]);

  } catch (err) {
    console.error("Error in fetching user deatils :", err);
    res.status(500).json({ message: "Server error" });
  }
};


// Get User Types Names
export const getUserTypeNames = async (req, res, next) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .execute("sp_GetUserTypeNames");

    res.json(result.recordset);

  } catch (err) {
    console.error("Error in fetching user types :", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get User Types
export const getUserType = async (req, res, next) => {
  try {
    const { UserTypeId } = req.body;
    //console.log("UserTypeId:", UserTypeId);

    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("UserTypeId", sql.UniqueIdentifier, UserTypeId)
      .execute("sp_GetUserTypes");

    if (result.recordsets.length > 1) {
      res.json({
        data: result.recordsets[0],   // user type details 
        status: result.recordsets[1][0], // SUCCESS / MESSAGE
      });
    } else {
      res.json({
        status: result.recordsets[0][0], // Unauthorized response
      });
    }

  } catch (err) {
    console.error("Error in fetching user types:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// Update User by Id
export const updateUserbyId = async (req, res, next) => {
  try {
    const data = req.body;
    //console.log("User Update Info : ", data);

    let fileUrl = data.profileImagePath; // default = old path

    // If new file uploaded, push to S3
    if (req.file) {
      const uploadResult = await uploadFile(req.file);
      fileUrl = uploadResult.Location;
      //console.log("New File Uploaded to S3 : ", fileUrl);
    }

    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("Name", sql.NVarChar(100), data.name)
      .input("UserId", sql.UniqueIdentifier, data.id)
      .input("Email", sql.NVarChar(100), data.email)
      .input("UserTypeId", sql.NVarChar(100), data.userTypeId)
      .input("Contact", sql.NVarChar(20), data.contact.toString())
      .input("ProfileImagePath", sql.NVarChar(sql.MAX), fileUrl) // updated path
      .input("Designation", sql.NVarChar(sql.MAX), data.designation)
      .input("IsActive", sql.Bit, data.isActive === true || data.isActive === "true")
      .input("ModifiedBy", sql.UniqueIdentifier, req.user.id)
      .execute("sp_UpdateUserByUserID");

    //console.log(result.recordset[0])
    if (result.recordset[0].Success) {
      res.status(201).json(result.recordset[0]);
    } else {
      res.json(result.recordset[0]);
    }
  } catch (err) {
    console.error("Error in updating user :", err);
    res.status(500).json({ message: "Server error" });
  }
};


// Update User Password
export const updatePassword = async (req, res, next) => {
  try {
    const { newPassword } = req.body;
    console.log(newPassword)
    const hashPassword = await bcrypt.hash(newPassword, 10);
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("UserId", sql.UniqueIdentifier, req.user.id)
      .input("Password", sql.NVarChar(100), newPassword)
      .input("HashPassword", sql.NVarChar(sql.MAX), hashPassword)
      .execute("sp_UpdatePassword");

    if (result.recordset[0].Success) {
      res.status(201).json(result.recordset[0]);
    } else {
      res.json(result.recordset[0]);
    }

  } catch (err) {
    console.error("Error in updating password :", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Create User Type
export const createUserType = async (req, res) => {
  try {
    const pool = await poolPromise;
    const {
      Name,
      IsAdmin,
      IsRegularUser,
      permissions = {}
    } = req.body;

    // Validate main fields
    if (!Name || typeof Name !== "string") {
      throw new Error("Invalid argument: Name is required and must be a string");
    }

    validateBit(IsAdmin, "IsAdmin");
    validateBit(IsRegularUser, "IsRegularUser");

    // Validate all permissions
    const modules = [
      "lead",
      "invoice",
      "quotation",
      "user",
      "followUps",
      "target",
      "orders",
      "product",
    ];
    const actions = ["read", "create", "update", "delete"];

    for (const module of modules) {
      if (!permissions[module]) {
        throw new Error(`Missing permissions object for module: ${module}`);
      }
      for (const action of actions) {
        if (
          permissions[module][action] === undefined ||
          permissions[module][action] === null
        ) {
          throw new Error(`Missing permission: ${module}.${action}`);
        }
        validateBit(permissions[module][action], `${module}.${action}`);
      }
    }

    // If validation passed, proceed with SP call
    const result = await pool
      .request()
      .input("Name", sql.NVarChar(100), Name)
      .input("IsAdmin", sql.Bit, IsAdmin)
      .input("IsRegularUser", sql.Bit, IsRegularUser)
      .input("CreatedBy", sql.UniqueIdentifier, req.user.id)
      .input("ModifiedBy", sql.UniqueIdentifier, req.user.id)

      // Lead
      .input("LeadReadAccess", sql.Bit, permissions.lead.read)
      .input("LeadCreateAccess", sql.Bit, permissions.lead.create)
      .input("LeadUpdateAccess", sql.Bit, permissions.lead.update)
      .input("LeadDeleteAccess", sql.Bit, permissions.lead.delete)

      // Invoices
      .input("InvoiceReadAccess", sql.Bit, permissions.invoice.read)
      .input("InvoiceCreateAccess", sql.Bit, permissions.invoice.create)
      .input("InvoiceUpdateAccess", sql.Bit, permissions.invoice.update)
      .input("InvoiceDeleteAccess", sql.Bit, permissions.invoice.delete)

      // Quotation
      .input("QuotationReadAccess", sql.Bit, permissions.quotation.read)
      .input("QuotationCreateAccess", sql.Bit, permissions.quotation.create)
      .input("QuotationUpdateAccess", sql.Bit, permissions.quotation.update)
      .input("QuotationDeleteAccess", sql.Bit, permissions.quotation.delete)

      // User
      .input("UserReadAccess", sql.Bit, permissions.user.read)
      .input("UserCreateAccess", sql.Bit, permissions.user.create)
      .input("UserUpdateAccess", sql.Bit, permissions.user.update)
      .input("UserDeleteAccess", sql.Bit, permissions.user.delete)

      // FollowUps
      .input("FollowUpsReadAccess", sql.Bit, permissions.followUps.read)
      .input("FollowUpsCreateAccess", sql.Bit, permissions.followUps.create)
      .input("FollowUpsUpdateAccess", sql.Bit, permissions.followUps.update)
      .input("FollowUpsDeleteAccess", sql.Bit, permissions.followUps.delete)

      // Target
      .input("TargetReadAccess", sql.Bit, permissions.target.read)
      .input("TargetCreateAccess", sql.Bit, permissions.target.create)
      .input("TargetUpdateAccess", sql.Bit, permissions.target.update)
      .input("TargetDeleteAccess", sql.Bit, permissions.target.delete)

      // Orders
      .input("OrdersReadAccess", sql.Bit, permissions.orders.read)
      .input("OrdersCreateAccess", sql.Bit, permissions.orders.create)
      .input("OrdersUpdateAccess", sql.Bit, permissions.orders.update)
      .input("OrdersDeleteAccess", sql.Bit, permissions.orders.delete)

      // Product
      .input("ProductReadAccess", sql.Bit, permissions.product.read)
      .input("ProductCreateAccess", sql.Bit, permissions.product.create)
      .input("ProductUpdateAccess", sql.Bit, permissions.product.update)
      .input("ProductDeleteAccess", sql.Bit, permissions.product.delete)

      .execute("sp_CreateUserType");

    if (result.recordset[0].Success) {
      res.status(201).json(result.recordset[0]);
    } else {
      res.json(result.recordset[0]);
    }
  } catch (err) {
    console.error("Error creating UserType:", err);
    res.status(400).json({ message: "Invalid arguments", error: err.message });
  }
};


// Update User Type by id
export const updateUserTypeById = async (req, res) => {
  try {
    const pool = await poolPromise;
    console.log("update user : ",req.body)
    const {
      UserTypeId,
      Name,
      IsAdmin,
      IsRegularUser,
      IsActive,
      permissions = {}
    } = req.body;

    // validate required fields
    if (!UserTypeId || !Name) {
      return res.status(400).json({ message: "UserTypeId and Name are required." });
    }

    // Validate main fields
    validateBit(IsAdmin, "IsAdmin");
    validateBit(IsRegularUser, "IsRegularUser");
    validateBit(IsActive, "IsActive");

    // Validate all permissions
    const modules = [
      "lead",
      "invoice",
      "quotation",
      "user",
      "followUps",
      "target",
      "orders",
      "product",
    ];
    const actions = ["read", "create", "update", "delete"];

    for (const module of modules) {
      if (permissions[module]) {
        for (const action of actions) {
          if (permissions[module][action] === undefined || permissions[module][action] === null) {
            throw new Error(`Missing permission: ${module}.${action}`);
          }
          validateBit(permissions[module][action], `${module}.${action}`);
        }
      } else {
        throw new Error(`Missing permissions object for module: ${module}`);
      }
    }

    // Proceed only if all validations passed
    const result = await pool
      .request()
      .input("UserTypeId", sql.UniqueIdentifier, UserTypeId)
      .input("UserId", sql.UniqueIdentifier, req.user.id)
      .input("Name", sql.NVarChar(100), Name)
      .input("IsAdmin", sql.Bit, IsAdmin)
      .input("IsRegularUser", sql.Bit, IsRegularUser)
      .input("ModifiedBy", sql.UniqueIdentifier, req.user.id)
      .input("IsActive", sql.Bit, IsActive)

      // Lead
      .input("LeadReadAccess", sql.Bit, permissions.lead.read)
      .input("LeadCreateAccess", sql.Bit, permissions.lead.create)
      .input("LeadUpdateAccess", sql.Bit, permissions.lead.update)
      .input("LeadDeleteAccess", sql.Bit, permissions.lead.delete)

      // Invoice
      .input("InvoiceReadAccess", sql.Bit, permissions.invoice.read)
      .input("InvoiceCreateAccess", sql.Bit, permissions.invoice.create)
      .input("InvoiceUpdateAccess", sql.Bit, permissions.invoice.update)
      .input("InvoiceDeleteAccess", sql.Bit, permissions.invoice.delete)

      // Quotation
      .input("QuotationReadAccess", sql.Bit, permissions.quotation.read)
      .input("QuotationCreateAccess", sql.Bit, permissions.quotation.create)
      .input("QuotationUpdateAccess", sql.Bit, permissions.quotation.update)
      .input("QuotationDeleteAccess", sql.Bit, permissions.quotation.delete)

      // User
      .input("UserReadAccess", sql.Bit, permissions.user.read)
      .input("UserCreateAccess", sql.Bit, permissions.user.create)
      .input("UserUpdateAccess", sql.Bit, permissions.user.update)
      .input("UserDeleteAccess", sql.Bit, permissions.user.delete)

      // FollowUps
      .input("FollowUpsReadAccess", sql.Bit, permissions.followUps.read)
      .input("FollowUpsCreateAccess", sql.Bit, permissions.followUps.create)
      .input("FollowUpsUpdateAccess", sql.Bit, permissions.followUps.update)
      .input("FollowUpsDeleteAccess", sql.Bit, permissions.followUps.delete)

      // Target
      .input("TargetReadAccess", sql.Bit, permissions.target.read)
      .input("TargetCreateAccess", sql.Bit, permissions.target.create)
      .input("TargetUpdateAccess", sql.Bit, permissions.target.update)
      .input("TargetDeleteAccess", sql.Bit, permissions.target.delete)

      // Orders
      .input("OrdersReadAccess", sql.Bit, permissions.orders.read)
      .input("OrdersCreateAccess", sql.Bit, permissions.orders.create)
      .input("OrdersUpdateAccess", sql.Bit, permissions.orders.update)
      .input("OrdersDeleteAccess", sql.Bit, permissions.orders.delete)

      // Product
      .input("ProductReadAccess", sql.Bit, permissions.product.read)
      .input("ProductCreateAccess", sql.Bit, permissions.product.create)
      .input("ProductUpdateAccess", sql.Bit, permissions.product.update)
      .input("ProductDeleteAccess", sql.Bit, permissions.product.delete)

      .execute("sp_UpdateUserTypeByUserTypeId");
    
    console.log(result.recordset[0])

    if (result.recordset[0].Success) {
      res.status(201).json(result.recordset[0]);
    } else {
      res.json(result.recordset[0]);
    }
  } catch (err) {
    console.error("Error updating UserType:", err);
    res.status(400).json({ message: "Invalid arguments", error: err.message });
  }
};


// Get User Type By Id
export const getUserTypeById = async (req, res, next) => {
  try {
    const userTypeId = req.params.id;
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("UserId", sql.UniqueIdentifier, req.user.id)
      .input("UserTypeId", sql.UniqueIdentifier, userTypeId)
      .execute("sp_GetUserTypeByUserTypeId");

    if (result.recordset[0].Success) {
      res.status(201).json(result.recordsets);
    } else {
      res.json(result.recordsets);
    }

  } catch (err) {
    console.error("Error in fetching user type by id :", err);
    res.status(500).json({ message: "Server error" });
  }
};