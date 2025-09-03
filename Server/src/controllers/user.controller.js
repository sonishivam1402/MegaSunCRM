import { sql, poolPromise } from "../database/db.js";
import bcrypt from "bcryptjs";

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

    res.json(result.recordset);

  } catch (err) {
    console.error("Error in fetching user deatils :", err);
    res.status(500).json({ message: "Server error" });
  }
};


// Get User Types
export const getUserTypes = async (req, res, next) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .execute("sp_GetUserTypes");

    res.json(result.recordset);

  } catch (err) {
    console.error("Error in fetching user types :", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update User by Id
export const updateUserbyId = async (req, res, next) => {
  try {
    const { user } = req.body;
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("Name", sql.NVarChar(100), user.name)
      .input("UserId", sql.UniqueIdentifier, user.userId)
      .input("Email", sql.NVarChar(100), user.email)
      .input("UserTypeId", sql.NVarChar(100), user.userTypeId)
      .input("Contact", sql.NVarChar(20), user.contact.toString())
      .input("ProfileImagePath", sql.NVarChar(sql.MAX), user.profileImagePath)
      .input("Designation", sql.NVarChar(sql.MAX), user.designation)
      .input("IsActive", sql.Bit, user.isActive)
      .input("ModifiedBy", sql.UniqueIdentifier, user.modifiedBy)
      .execute("sp_UpdateUserByUserID");

    res.json(result.recordset[0]);

  } catch (err) {
    console.error("Error in updating new user :", err);
    res.status(500).json({ message: "Server error" });
  }
};


// Update User Password
export const updatePassword = async (req, res, next) => {
  try {
    const { userId, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("UserId", sql.UniqueIdentifier, userId)
      .input("Password", sql.NVarChar(100), password)
      .input("HashPassword", sql.NVarChar(sql.MAX), hashPassword)
      .execute("sp_UpdatePassword");

        res.json(result.recordset);

    } catch (err) {
        console.error("Error in updating password :", err);
        res.status(500).json({ message: "Server error" });
    }
};


// Create User Type

const createUserType = async (req, res) => {  // need to update
    try {
        const {
            name,
            isAdmin,
            isRegularUser,
            createdBy,
            modifiedBy,
            permissions // should be an array of permission objects
        } = req.body;

        // Validate input
        if (!name || !createdBy || !modifiedBy || !Array.isArray(permissions)) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        const permissionsJson = JSON.stringify(permissions);

        const pool = await poolPromise;
        const request = pool.request();

        request.input('Name', sql.NVarChar(100), name);
        request.input('IsAdmin', sql.Bit, isAdmin);
        request.input('IsRegularUser', sql.Bit, isRegularUser);
        request.input('CreatedBy', sql.UniqueIdentifier, createdBy);
        request.input('ModifiedBy', sql.UniqueIdentifier, modifiedBy);
        request.input('PermissionsJson', sql.NVarChar(sql.MAX), permissionsJson);

        const result = await request.execute('dbo.sp_CreateUserTypeJson');

        res.json({
            success: result.recordset[0]?.Success === 1,
            message: result.recordset[0]?.Message || 'Procedure executed'
        });
    } catch (err) {
        console.error('Error in createUserType:', err);
        res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
    }
};
