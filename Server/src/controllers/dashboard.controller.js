import { sql, poolPromise } from "../database/db.js";

export const getDashboardDetails = async (req, res, next) => {
    try {
        const pool = await poolPromise;
        const result = await pool
            .request()
            .input("UserId", sql.UniqueIdentifier, req.user.id)
            .execute("sp_GetDashboardData_v6");

        // Assuming the SP returns [{ DashboardData: '...json string...' }]
        let data = result.recordset[0];

        if (data && data.DashboardData) {
            try {
                data.DashboardData = JSON.parse(data.DashboardData);
            } catch (err) {
                console.error("Error parsing DashboardData JSON:", err);
            }
        }

        res.json(data);

    } catch (err) {
        console.error("Error in fetching dashboard details :", err);
        const appError = new Error("Failed to fetch dashboard details");
        appError.additionalData = {
          sqlMessage: err.message,
          sqlProcName: err.procName,
          sqlNumber: err.number,
        };
        return next(appError);
    }
};

export const getDashboardLeadershipData = async (req, res, next) => {
    try {
        const pool = await poolPromise;
        const result = await pool
            .request()
            .execute("sp_GetDashboardLeaderboardData");

        // Assuming the SP returns [{ DashboardData: '...json string...' }]
        let data = result.recordset[0];
        // console.log(result.recordsets);

        if (data && data.LeaderboardData) {
            try {
                data.LeaderboardData = JSON.parse(data.LeaderboardData);
            } catch (err) {
                console.error("Error parsing Leaderboard Data JSON:", err);
            }
        }

        res.json(data);

    } catch (err) {
        console.error("Error in fetching dashboard details :", err);
        const appError = new Error("Failed to fetch dashboard leadership data");
        appError.additionalData = {
          sqlMessage: err.message,
          sqlProcName: err.procName,
          sqlNumber: err.number,
        };
        return next(appError);
    }
};


export const getProductsByRange = async (req, res) => {
  try {
    const pool = await poolPromise;
    const { startDate, endDate } = req.query;
    // console.log(startDate, endDate);
    const result = await pool
      .request()
      .input("StartDate", sql.Date, startDate || null)
      .input("EndDate", sql.Date, endDate || null)
      .input("UserID", sql.UniqueIdentifier, req.user.id)
      .execute("sp_GetDashboardProductByRange");

    // result.recordset[0].ResultJson now holds the full JSON string
    const jsonText = result.recordset[0].ResultJson;
    const data = JSON.parse(jsonText);

    res.json(data);
  } catch (err) {
    console.error("Error fetching dashboard details:", err);
    const appError = new Error("Failed to fetch products by range");
    appError.additionalData = {
      sqlMessage: err.message,
      sqlProcName: err.procName,
      sqlNumber: err.number,
    };
    return next(appError);
  }
};

