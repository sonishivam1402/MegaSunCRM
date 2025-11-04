import { sql, poolPromise } from "../database/db.js";

export const getDashboardDetails = async (req, res, next) => {
    try {
        const pool = await poolPromise;
        const result = await pool
            .request()
            .input("UserId", sql.UniqueIdentifier, req.user.id)
            .execute("sp_GetDashboardData_v5");

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
        res.status(500).json({ message: "Server error" });
    }
};