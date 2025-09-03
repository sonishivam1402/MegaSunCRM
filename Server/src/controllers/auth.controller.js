import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt.js";
import { sql, poolPromise } from "../database/db.js"; // MSSQL connection


// Create New User
export const createNewUser = async (req, res, next) => {
  try {
    const { user } = req.body;
    const hashPassword = await bcrypt.hash(user.password, 10);
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("Name", sql.NVarChar(100), user.name)
      .input("Email", sql.NVarChar(100), user.email)
      .input("Password", sql.NVarChar(100), user.password)
      .input("UserTypeId", sql.NVarChar(100), user.userTypeId)
      .input("HashPassword", sql.NVarChar(sql.MAX), hashPassword)
      .input("Contact", sql.NVarChar(20), user.contact.toString())
      .input("ProfileImagePath", sql.NVarChar(sql.MAX), user.profileImagePath)
      .input("Designation", sql.NVarChar(sql.MAX), user.designation)
      .input("GSTId", sql.NVarChar(100), user.gstId)
      .input("Address", sql.NVarChar(sql.MAX), user.address)
      .input("CreatedBy", sql.UniqueIdentifier, user.createdBy)
      .input("ModifiedBy", sql.UniqueIdentifier, user.modifiedBy)
      .execute("sp_CreateNewUser");

    res.json(result.recordset[0]);

  } catch (err) {
    console.error("Error in creating new user :", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Sign-In
export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const pool = await poolPromise;

    const result = await pool
        .request()
        .input("Email", sql.NVarChar, email) 
        .execute("sp_UserLogin"); 


    const user = result.recordset[0];
    console.log(user);
    if (user.UserId==null) {
      await logActivity(null, "Login Failed", email); 
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.HashPassword);
    if (!isMatch) {
      await logActivity(user.UserId, "Login Failed", email);
      return res.status(400).json({ message: "Wrong Password" });
    }

    // Success Activity Log
    await logActivity(user.UserId, "Login Success", email); 

    // Get Permissions
    const menusResult = await pool
      .request()
      .input("UserTypeId", sql.UniqueIdentifier, user.UserTypeId)
      .execute("sp_GetPermissions");

    // Generate JWT
    const token = generateToken({ id: user.UserId, email: user.Email, userTypeId: user.UserTypeId });

    const { HashPassword, ...userWithoutPassword } = user; //remove password

    res.json({ token, user:userWithoutPassword, menus: menusResult.recordset });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Reusable log function
async function logActivity(UserId, activityType, attemptedUsername) {
  const pool = await poolPromise;
  await pool.request()
    .input("UserId", sql.UniqueIdentifier, UserId)
    .input("ActivityType", sql.VarChar, activityType) // "LoginSuccess" or "LoginFailed" or "Logout"
    .input("AttemptedUsername", sql.VarChar, attemptedUsername)
    .query(`
      INSERT INTO UserActivityLog (UserId, ActivityType, AttemptedUsername, LogTimestamp)
      VALUES (@UserId, @ActivityType, @AttemptedUsername, GETDATE())
    `);
}
