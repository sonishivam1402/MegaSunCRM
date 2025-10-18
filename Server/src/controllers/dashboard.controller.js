import { sql, poolPromise } from "../database/db.js";

export const getDashboardDetails = async (req, res, next) => {
    try {
        const pool = await poolPromise;
        const result = await pool
            .request()
            .input("UserId", sql.UniqueIdentifier, req.user.id)
            .execute("sp_GetDashboardData");

        res.json(result.recordsets);

    } catch (err) {
        console.error("Error in fetching dashboard details :", err);
        res.status(500).json({ message: "Server error" });
    }
};