import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";
import { sql, poolPromise } from "../database/db.js"; // MSSQL connection

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
    if (!user) {
      await logActivity(null, "Login Failed", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.HashPassword);
    if (!isMatch) {
      await logActivity(user.UserId, "Login Failed", email);
      return res.status(400).json({ message: "Wrong Password" });
    }

    await logActivity(user.UserId, "Login Success", email);

    const menusResult = await pool
      .request()
      .input("UserTypeId", sql.UniqueIdentifier, user.UserTypeId)
      .execute("sp_GetPermissions");

    // Generate tokens
    const accessToken = generateAccessToken({
      id: user.UserId,
      email: user.Email,
      userTypeId: user.UserTypeId,
    });

    const refreshToken = generateRefreshToken({
      id: user.UserId
    });
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7);

    // Storing refresh token in DB
    await pool.request()
      .input("UserId", sql.UniqueIdentifier, user.UserId)
      .input("Token", sql.NVarChar, refreshToken)
      .input("ExpiryDate", sql.DateTime, expiryDate)
      .query(`
      INSERT INTO RefreshTokens (UserId, Token, ExpiryDate)
      VALUES (@UserId, @Token, @ExpiryDate)
    `);

    const { HashPassword, ...userWithoutPassword } = user;

    res.json({
      accessToken,
      refreshToken,
      user: userWithoutPassword,
      menus: menusResult.recordset,
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Create Refresh Token
export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(401).json({ message: "Refresh token required" });

    const pool = await poolPromise;
    const result = await pool.request()
      .input("Token", sql.NVarChar, refreshToken)
      .execute("sp_GetRefreshToken");

    const tokenData = result.recordset[0];
    if (!tokenData || new Date(tokenData.ExpiryDate) < new Date()) {
      return res.status(403).json({ message: "Invalid or expired refresh token" });
    }
    console.log("Refresh Token :", tokenData);

    const newAccessToken = generateAccessToken({
      id: tokenData.UserId,
      email: tokenData.Email,
      userTypeId: tokenData.UserTypeId,
    });

    res.json({ accessToken: newAccessToken });

  } catch (err) {
    console.error("Refresh error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Logout
export const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const pool = await poolPromise;

    await pool.request()
      .input("Token", sql.NVarChar, refreshToken)
      .execute("sp_DeleteRefreshToken");

    res.json({ message: "Logged out" });
  } catch (err) {
    console.error("Logout error:", err);
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
