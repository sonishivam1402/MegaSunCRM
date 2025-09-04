import jwt from "jsonwebtoken";
import sql from "mssql";
import {poolPromise} from "../database/db.js";
import { verifyToken } from "../utils/jwt.js";

export const authenticate = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = verifyToken(token);
    req.user = { id: decoded.id, email: decoded.email };
    
    try {
      const pool = await poolPromise;
      const menusResult = await pool
        .request()
        .input("UserTypeId", sql.UniqueIdentifier, decoded.userTypeId)
        .execute("sp_GetPermissions");

      req.user.menus = menusResult.recordset;
      next();
    } catch (dbError) {
      console.error("Database error in auth middleware:", dbError);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    
  } catch (err) {
    if (err.name === 'TokenExpiredError' || 
        err.name === 'JsonWebTokenError' || 
        err.name === 'NotBeforeError') {
      return res.status(401).json({ message: "Invalid Token" });
    }
    
    console.error("Unexpected auth error:", err);
    return res.status(401).json({ message: "Invalid Token" });
  }
};