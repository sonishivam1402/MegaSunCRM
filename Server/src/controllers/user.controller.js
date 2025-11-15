import { sql, poolPromise } from "../database/db.js";
import bcrypt from "bcryptjs";
import uploadFile from '../database/s3.js';
import validateBit from "../utils/validateBit.js";
import validator from "validator";

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

    const isEmailValid = validator.isEmail(data.email);

    //const isContactValid = validator.isMobilePhone(data.contact, 'any');

    if (!isEmailValid) {
      return res.json({ message: "Please check email details." });
    }

    const newContact = data.countryCode+"-" + data.contact;
    //console.log(newContact);

    const hashPassword = await bcrypt.hash(data.password, 10);
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("Name", sql.NVarChar(100), data.name)
      .input("Email", sql.NVarChar(100), data.email)
      .input("Password", sql.NVarChar(100), data.password)
      .input("UserTypeId", sql.NVarChar(100), data.userTypeId)
      .input("HashPassword", sql.NVarChar(sql.MAX), hashPassword)
      .input("Contact", sql.NVarChar(20), newContact.toString())
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
    const { search = "", limit = 10, offset = 0, status, userTypeId } = req.query;
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("SearchParameter", sql.NVarChar(100), search)
      .input("LimitParameter", sql.Int, parseInt(limit))
      .input("OffsetParameter", sql.Int, parseInt(offset))
      .input("StatusParam", sql.Bit, status)
      .input("UserTypeId", sql.UniqueIdentifier, userTypeId)
      .execute("sp_GetUsers");

    res.json({ users: result.recordsets[0], totalRecords: result.recordsets[1] });

  } catch (err) {
    console.error("Error in fetching all users :", err);
    res.status(500).json({ message: "Server error" });
  }
};

// User by Id
export const getUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const loggedInUser = req.user; 

    if (!loggedInUser.isAdmin && loggedInUser.id !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

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

    const newContact = data.countryCode+"-" + data.contact;

    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("Name", sql.NVarChar(100), data.name)
      .input("UserId", sql.UniqueIdentifier, data.id)
      .input("Email", sql.NVarChar(100), data.email)
      .input("UserTypeId", sql.NVarChar(100), data.userTypeId)
      .input("Contact", sql.NVarChar(20), newContact.toString())
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

// Update Image
export const updateImageByUserId = async (req, res, next) => {
  try {
    const data = req.body;
    //console.log("User Image Info : ", data);

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
      .input("UserId", sql.UniqueIdentifier, data.id)
      .input("ProfileImagePath", sql.NVarChar(sql.MAX), fileUrl)
      .execute("sp_UpdateProfileImage");

    //console.log(result.recordset[0])
    if (result.recordset[0].Success) {
      res.status(201).json(result.recordset[0]);
    } else {
      res.json(result.recordset[0]);
    }
  } catch (err) {
    console.error("Error in updating image :", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update User Password
export const updatePassword = async (req, res, next) => {
  try {
    const { newPassword } = req.body;
    // console.log(newPassword)
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
      pageAccess = {},
      dashboardAccess = {}
    } = req.body;

    // Validate main fields
    if (!Name || typeof Name !== "string") {
      throw new Error("Invalid argument: Name is required and must be a string");
    }

    validateBit(IsAdmin, "IsAdmin");
    validateBit(IsRegularUser, "IsRegularUser");

    // Validate page permissions
    const modules = [
      "lead",
      "quotation",
      "user",
      "followUps",
      "target",
      "orders",
      "product",
    ];
    const actions = ["read", "create", "update", "delete"];

    for (const module of modules) {
      if (!pageAccess[module]) {
        throw new Error(`Missing pageAccess object for module: ${module}`);
      }
      for (const action of actions) {
        if (
          pageAccess[module][action] === undefined ||
          pageAccess[module][action] === null
        ) {
          throw new Error(`Missing permission: ${module}.${action}`);
        }
        validateBit(pageAccess[module][action], `${module}.${action}`);
      }
    }

    // Validate dashboard permissions
    const dashboardModules = [
      "target",
      "quotation",
      "order",
      "followUps",
      "leads",
    ];

    for (const module of dashboardModules) {
      if (dashboardAccess[module] === undefined || dashboardAccess[module] === null) {
        throw new Error(`Missing dashboardAccess for module: ${module}`);
      }
      validateBit(dashboardAccess[module], `dashboardAccess.${module}`);
    }

    // If validation passed, proceed with SP call
    const result = await pool
      .request()
      .input("Name", sql.NVarChar(100), Name)
      .input("IsAdmin", sql.Bit, IsAdmin)
      .input("IsRegularUser", sql.Bit, IsRegularUser)
      .input("CreatedBy", sql.UniqueIdentifier, req.user.id)
      .input("ModifiedBy", sql.UniqueIdentifier, req.user.id)

      // Page Access - Lead
      .input("LeadReadAccess", sql.Bit, pageAccess.lead.read)
      .input("LeadCreateAccess", sql.Bit, pageAccess.lead.create)
      .input("LeadUpdateAccess", sql.Bit, pageAccess.lead.update)
      .input("LeadDeleteAccess", sql.Bit, pageAccess.lead.delete)

      // Page Access - Quotation
      .input("QuotationReadAccess", sql.Bit, pageAccess.quotation.read)
      .input("QuotationCreateAccess", sql.Bit, pageAccess.quotation.create)
      .input("QuotationUpdateAccess", sql.Bit, pageAccess.quotation.update)
      .input("QuotationDeleteAccess", sql.Bit, pageAccess.quotation.delete)

      // Page Access - User
      .input("UserReadAccess", sql.Bit, pageAccess.user.read)
      .input("UserCreateAccess", sql.Bit, pageAccess.user.create)
      .input("UserUpdateAccess", sql.Bit, pageAccess.user.update)
      .input("UserDeleteAccess", sql.Bit, pageAccess.user.delete)

      // Page Access - FollowUps
      .input("FollowUpsReadAccess", sql.Bit, pageAccess.followUps.read)
      .input("FollowUpsCreateAccess", sql.Bit, pageAccess.followUps.create)
      .input("FollowUpsUpdateAccess", sql.Bit, pageAccess.followUps.update)
      .input("FollowUpsDeleteAccess", sql.Bit, pageAccess.followUps.delete)

      // Page Access - Target
      .input("TargetReadAccess", sql.Bit, pageAccess.target.read)
      .input("TargetCreateAccess", sql.Bit, pageAccess.target.create)
      .input("TargetUpdateAccess", sql.Bit, pageAccess.target.update)
      .input("TargetDeleteAccess", sql.Bit, pageAccess.target.delete)

      // Page Access - Orders
      .input("OrdersReadAccess", sql.Bit, pageAccess.orders.read)
      .input("OrdersCreateAccess", sql.Bit, pageAccess.orders.create)
      .input("OrdersUpdateAccess", sql.Bit, pageAccess.orders.update)
      .input("OrdersDeleteAccess", sql.Bit, pageAccess.orders.delete)

      // Page Access - Product
      .input("ProductReadAccess", sql.Bit, pageAccess.product.read)
      .input("ProductCreateAccess", sql.Bit, pageAccess.product.create)
      .input("ProductUpdateAccess", sql.Bit, pageAccess.product.update)
      .input("ProductDeleteAccess", sql.Bit, pageAccess.product.delete)

      // Dashboard Access
      .input("LeadPermission", sql.Bit, dashboardAccess.leads)
      .input("FollowupPermission", sql.Bit, dashboardAccess.followUps)
      .input("QuotationPermission", sql.Bit, dashboardAccess.quotation)
      .input("OrdersPermission", sql.Bit, dashboardAccess.order)
      .input("TargetPermission", sql.Bit, dashboardAccess.target)

      .execute("sp_CreateUserType_v1");

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
    //console.log("update user : ", req.body)
    const {
      UserTypeId,
      Name,
      IsAdmin,
      IsRegularUser,
      IsActive,
      pageAccess = {},
      dashboardAccess = {}
    } = req.body;

    // validate required fields
    if (!UserTypeId || !Name) {
      return res.status(400).json({ message: "UserTypeId and Name are required." });
    }

    // Validate main fields
    validateBit(IsAdmin, "IsAdmin");
    validateBit(IsRegularUser, "IsRegularUser");
    validateBit(IsActive, "IsActive");

    // Validate page permissions
    const modules = [
      "lead",
      "quotation",
      "user",
      "followUps",
      "target",
      "orders",
      "product",
    ];
    const actions = ["read", "create", "update", "delete"];

    for (const module of modules) {
      if (pageAccess[module]) {
        for (const action of actions) {
          if (pageAccess[module][action] === undefined || pageAccess[module][action] === null) {
            throw new Error(`Missing permission: ${module}.${action}`);
          }
          validateBit(pageAccess[module][action], `${module}.${action}`);
        }
      } else {
        throw new Error(`Missing pageAccess object for module: ${module}`);
      }
    }

    // Validate dashboard permissions
    const dashboardModules = [
      "target",
      "quotation",
      "order",
      "followUps",
      "leads",
    ];

    for (const module of dashboardModules) {
      if (dashboardAccess[module] === undefined || dashboardAccess[module] === null) {
        throw new Error(`Missing dashboardAccess for module: ${module}`);
      }
      validateBit(dashboardAccess[module], `dashboardAccess.${module}`);
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

      // Page Access - Lead
      .input("LeadReadAccess", sql.Bit, pageAccess.lead.read)
      .input("LeadCreateAccess", sql.Bit, pageAccess.lead.create)
      .input("LeadUpdateAccess", sql.Bit, pageAccess.lead.update)
      .input("LeadDeleteAccess", sql.Bit, pageAccess.lead.delete)

      // Page Access - Quotation
      .input("QuotationReadAccess", sql.Bit, pageAccess.quotation.read)
      .input("QuotationCreateAccess", sql.Bit, pageAccess.quotation.create)
      .input("QuotationUpdateAccess", sql.Bit, pageAccess.quotation.update)
      .input("QuotationDeleteAccess", sql.Bit, pageAccess.quotation.delete)

      // Page Access - User
      .input("UserReadAccess", sql.Bit, pageAccess.user.read)
      .input("UserCreateAccess", sql.Bit, pageAccess.user.create)
      .input("UserUpdateAccess", sql.Bit, pageAccess.user.update)
      .input("UserDeleteAccess", sql.Bit, pageAccess.user.delete)

      // Page Access - FollowUps
      .input("FollowUpsReadAccess", sql.Bit, pageAccess.followUps.read)
      .input("FollowUpsCreateAccess", sql.Bit, pageAccess.followUps.create)
      .input("FollowUpsUpdateAccess", sql.Bit, pageAccess.followUps.update)
      .input("FollowUpsDeleteAccess", sql.Bit, pageAccess.followUps.delete)

      // Page Access - Target
      .input("TargetReadAccess", sql.Bit, pageAccess.target.read)
      .input("TargetCreateAccess", sql.Bit, pageAccess.target.create)
      .input("TargetUpdateAccess", sql.Bit, pageAccess.target.update)
      .input("TargetDeleteAccess", sql.Bit, pageAccess.target.delete)

      // Page Access - Orders
      .input("OrdersReadAccess", sql.Bit, pageAccess.orders.read)
      .input("OrdersCreateAccess", sql.Bit, pageAccess.orders.create)
      .input("OrdersUpdateAccess", sql.Bit, pageAccess.orders.update)
      .input("OrdersDeleteAccess", sql.Bit, pageAccess.orders.delete)

      // Page Access - Product
      .input("ProductReadAccess", sql.Bit, pageAccess.product.read)
      .input("ProductCreateAccess", sql.Bit, pageAccess.product.create)
      .input("ProductUpdateAccess", sql.Bit, pageAccess.product.update)
      .input("ProductDeleteAccess", sql.Bit, pageAccess.product.delete)

      // Dashboard Access
      .input("LeadPermission", sql.Bit, dashboardAccess.leads)
      .input("FollowupPermission", sql.Bit, dashboardAccess.followUps)
      .input("QuotationPermission", sql.Bit, dashboardAccess.quotation)
      .input("OrdersPermission", sql.Bit, dashboardAccess.order)
      .input("TargetPermission", sql.Bit, dashboardAccess.target)

      .execute("sp_UpdateUserTypeByUserTypeId_v1");

    //console.log(result.recordset[0])

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
      .execute("sp_GetUserTypeByUserTypeId_v1");

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


//Get User for dropdown
export const getUsersForDropdown = async (req, res, next) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().execute("sp_GetUsersForAdminDDNLeads");

    res.json(result.recordsets);
  } catch (err) {
    console.error("Error in fetching all users :", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const userMobileBlurValidation = async (req, res, next) => {
  try {
    const contact = req.query.contact;
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("Contact", sql.NVarChar, contact)
      .execute("sp_UserContactBlurValidation");

    if (result.recordset[0].Success) {
      res.status(201).json(result.recordsets[0]);
    } else {
      res.json(result.recordsets[0]);
    }
  } catch (err) {
    console.error("Error in checking user contact details :", err);
    res.status(500).json({ message: "Server error" });
  }
};