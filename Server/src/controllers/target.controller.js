import { sql, poolPromise } from "../database/db.js";

export const getTargets = async (req, res, next) => {
  try {
    const { offset = 0, limit = 50 } = req.query;

    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("LimitParameter", sql.Int, parseInt(limit))
      .input("OffsetParameter", sql.Int, parseInt(offset))
      .input("UserId", sql.UniqueIdentifier, req.user.id)
      .execute("sp_GetTargets");

    res.json(result.recordsets);
  } catch (err) {
    console.error("Error in fetching target deatils :", err);
    next(err);
  }
};

export const getTargetByUserId = async (req, res, next) => {
  try {
    const { userId, offset, limit } = req.query;
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("UserId", sql.UniqueIdentifier, userId)
      .input("LimitParameter", sql.Int, parseInt(limit))
      .input("OffsetParameter", sql.Int, parseInt(offset))
      .execute("sp_GetTargetByUserId");

    res.json(result.recordsets);
  } catch (err) {
    console.error("Error in fetching target deatil by user id :", err);
    next(err);
  }
};

export const getTargetUsers = async (req, res, next) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().execute("sp_GetUsersForTarget");

    res.json(result.recordsets);
  } catch (err) {
    console.error("Error in fetching target users :", err);
    next(err);
  }
};

export const getOrderByUserIdAndMonth = async (req, res, next) => {
  try {
    const { offset = 0, limit = 50, month, year, userId } = req.query;

    if (month > 12 || month < 1) {
      return res.json({ Message: "Invalid Month" });
    }

    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("UserId", sql.UniqueIdentifier, userId)
      .input("LimitParameter", sql.Int, parseInt(limit))
      .input("OffsetParameter", sql.Int, parseInt(offset))
      .input("Month", sql.Int, parseInt(month))
      .input("Year", sql.Int, parseInt(year))
      .execute("sp_GetOrdersByUserIdAndMonth");

    res.json(result.recordsets);
  } catch (err) {
    console.error(
      "Error in fetching target deatils by user id and month :",
      err
    );
    next(err);
  }
};

export const createTarget = async (req, res, next) => {
  try {
    const { data } = req.body;
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("TargetsJSON", sql.NVarChar(sql.MAX), JSON.stringify(data))
      .input("CreatedBy", sql.UniqueIdentifier, req.user.id)
      .execute("sp_CreateTargets");

    if (result.recordset[0].Success) {
      logger.info("Target Created Successfully", {
        requestId: req.id,
      });
      res.status(201).json(result.recordsets[0]);
    } else {
      logger.warn("Target Creation Failed", {
        requestId: req.id,
      });
      res.json(result.recordsets[0]);
    }
  } catch (err) {
    console.error("Error in creating target :", err);
    next(err);
  }
};

export const getTargetSalesByUserId = async (req, res, next) => {
  try {
    const { userId, year } = req.query;
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("UserId", sql.UniqueIdentifier, userId)
      .input("Year", sql.Int, parseInt(year))
      .execute("GetTargetAndSalesByUserID");

    res.json(result.recordsets);
  } catch (err) {
    console.error("Error in fetching target sales deatil by user id :", err);
    next(err);
  }
};
