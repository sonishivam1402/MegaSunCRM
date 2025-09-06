import { sql, poolPromise } from "../database/db.js";
import bcrypt from "bcryptjs";
import uploadFile from '../database/s3.js';

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
    const pool = await poolPromise;
    const result = await pool
      .request()
      .execute("sp_GetUsers");

    res.json(result.recordset);

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
    res.status(201).json(result.recordset[0]);
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
      CreatedBy,
      ModifiedBy,
      permissions = {}
    } = req.body;

    const result = await pool
      .request()
      .input("Name", sql.NVarChar(100), Name)
      .input("IsAdmin", sql.Bit, IsAdmin)
      .input("IsRegularUser", sql.Bit, IsRegularUser)
      .input("CreatedBy", sql.UniqueIdentifier, CreatedBy)
      .input("ModifiedBy", sql.UniqueIdentifier, ModifiedBy)

      // Lead
      .input("LeadReadAccess", sql.Bit, permissions.lead?.read ?? 0)
      .input("LeadCreateAccess", sql.Bit, permissions.lead?.create ?? 0)
      .input("LeadUpdateAccess", sql.Bit, permissions.lead?.update ?? 0)
      .input("LeadDeleteAccess", sql.Bit, permissions.lead?.delete ?? 0)

      // Dashboard (defaults 1 in SP)
      .input("DashboardReadAccess", sql.Bit, permissions.dashboard?.read ?? 1)
      .input("DashboardCreateAccess", sql.Bit, permissions.dashboard?.create ?? 1)
      .input("DashboardUpdateAccess", sql.Bit, permissions.dashboard?.update ?? 1)
      .input("DashboardDeleteAccess", sql.Bit, permissions.dashboard?.delete ?? 1)

      // Invoices
      .input("InvoiceReadAccess", sql.Bit, permissions.invoice?.read ?? 0)
      .input("InvoiceCreateAccess", sql.Bit, permissions.invoice?.create ?? 0)
      .input("InvoiceUpdateAccess", sql.Bit, permissions.invoice?.update ?? 0)
      .input("InvoiceDeleteAccess", sql.Bit, permissions.invoice?.delete ?? 0)

      // Quotation
      .input("QuotationReadAccess", sql.Bit, permissions.quotation?.read ?? 0)
      .input("QuotationCreateAccess", sql.Bit, permissions.quotation?.create ?? 0)
      .input("QuotationUpdateAccess", sql.Bit, permissions.quotation?.update ?? 0)
      .input("QuotationDeleteAccess", sql.Bit, permissions.quotation?.delete ?? 0)

      // User
      .input("UserReadAccess", sql.Bit, permissions.user?.read ?? 0)
      .input("UserCreateAccess", sql.Bit, permissions.user?.create ?? 0)
      .input("UserUpdateAccess", sql.Bit, permissions.user?.update ?? 0)
      .input("UserDeleteAccess", sql.Bit, permissions.user?.delete ?? 0)

      // FollowUps
      .input("FollowUpsReadAccess", sql.Bit, permissions.followUps?.read ?? 0)
      .input("FollowUpsCreateAccess", sql.Bit, permissions.followUps?.create ?? 0)
      .input("FollowUpsUpdateAccess", sql.Bit, permissions.followUps?.update ?? 0)
      .input("FollowUpsDeleteAccess", sql.Bit, permissions.followUps?.delete ?? 0)

      // Target
      .input("TargetReadAccess", sql.Bit, permissions.target?.read ?? 0)
      .input("TargetCreateAccess", sql.Bit, permissions.target?.create ?? 0)
      .input("TargetUpdateAccess", sql.Bit, permissions.target?.update ?? 0)
      .input("TargetDeleteAccess", sql.Bit, permissions.target?.delete ?? 0)

      // Orders
      .input("OrdersReadAccess", sql.Bit, permissions.orders?.read ?? 0)
      .input("OrdersCreateAccess", sql.Bit, permissions.orders?.create ?? 0)
      .input("OrdersUpdateAccess", sql.Bit, permissions.orders?.update ?? 0)
      .input("OrdersDeleteAccess", sql.Bit, permissions.orders?.delete ?? 0)

      // Product
      .input("ProductReadAccess", sql.Bit, permissions.product?.read ?? 0)
      .input("ProductCreateAccess", sql.Bit, permissions.product?.create ?? 0)
      .input("ProductUpdateAccess", sql.Bit, permissions.product?.update ?? 0)
      .input("ProductDeleteAccess", sql.Bit, permissions.product?.delete ?? 0)

      .execute("sp_CreateUserType");

    res.status(201).json({
      message: "UserType created successfully"
    });
  } catch (err) {
    console.error("Error creating UserType:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

