import jwt from "jsonwebtoken";
import sql from "mssql";
import {poolPromise} from "../database/db.js";

export const authenticate = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, email: decoded.email };
    const pool = await poolPromise;
    // fetch permissions fresh from DB
    const menusResult = await pool
      .request()
      .input("UserTypeId", sql.UniqueIdentifier, decoded.userTypeId)
      .execute("sp_GetPermissions");

    req.user.menus = menusResult.recordset;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Invalid Token" });
  }
};

