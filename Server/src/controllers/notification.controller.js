import { sql, poolPromise } from "../database/db.js";

// Function to call stored procedure
async function callStoredProcedure() {
  try {
    const pool = await poolPromise;
    console.log(`[${new Date().toLocaleString()}] Connected to DB`);

    const result = await pool.request().execute('sp_CreateNotificationForFollowUps');
    console.log('Stored procedure executed successfully:', result.recordset);
  } catch (err) {
    console.error('Error executing stored procedure:', err);
  } finally {
    await sql.close();
  }
}

// Function to calculate milliseconds until next 9 AM
function getMsUntilNext9AM() {
  const now = new Date();
  const next9am = new Date();

  next9am.setHours(9, 0, 0, 0);

  // If it's already past 9 AM today, schedule for tomorrow
  if (now > next9am) {
    next9am.setDate(next9am.getDate() + 1);
  }

  return next9am - now; // milliseconds until next 9 AM
}

// Function to schedule daily job
export const scheduleDailyJob = () => {
  const msUntilNext9AM = getMsUntilNext9AM();
  console.log(`Next job scheduled in ${(msUntilNext9AM / 1000 / 60).toFixed(2)} minutes`);

  // Run once at next 9 AM
  setTimeout(() => {
    callStoredProcedure();

    // Then repeat every 24 hours
    setInterval(callStoredProcedure, 24 * 60 * 60 * 1000);
  }, msUntilNext9AM);
}


// Get Notification by UserId
export const getUserNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    const pool = await poolPromise;

    const result = await pool.request()
      .input("UserId", sql.UniqueIdentifier, userId)
      .query(`
        SELECT LogID, IsRead, RenderedSubject, CreatedOn, RenderedMessage
        FROM NotificationLogs
        WHERE RecipientUserID = @UserId AND IsRead = 0
        ORDER BY CreatedOn DESC
      `);

    res.json(result.recordset);
  } catch (err) {
    console.error("Error fetching notifications:", err);
    res.status(500).send("Server Error");
  }
};

// Make mark as read Notification
export const markNotificationAsRead = async (req, res) => {
  try {
    const userId = req.user.id;
    const notifyId = req.params.id;
    const pool = await poolPromise;

    const result = await pool.request()
      .input("UserId", sql.UniqueIdentifier, userId)
      .input("NotifyId", sql.UniqueIdentifier, notifyId)
      .query(`
        UPDATE NotificationLogs
        SET IsRead = 1
        WHERE RecipientUserID = @UserId AND LogID = @NotifyId
      `);

    res.json(result.recordset);
  } catch (err) {
    console.error("Error marking notification as read :", err);
    res.status(500).send("Server Error");
  }
};

// Make mark all as read Notification
export const markAllNotificationAsRead = async (req, res) => {
  try {
    const userId = req.user.id;
    const { notifyIds } = req.body; // Expecting an array of GUIDs

    if (!notifyIds || !Array.isArray(notifyIds) || notifyIds.length === 0) {
      return res.status(400).json({ message: "notifyIds must be a non-empty array" });
    }

    const pool = await poolPromise;
    const request = pool.request();

    // Dynamically create parameter placeholders
    const idParams = notifyIds.map((_, i) => `@NotifyId${i}`).join(", ");

    // Add each ID as a parameter
    notifyIds.forEach((id, i) => {
      request.input(`NotifyId${i}`, sql.UniqueIdentifier, id);
    });

    request.input("UserId", sql.UniqueIdentifier, userId);

    const query = `
      UPDATE NotificationLogs
      SET IsRead = 1
      WHERE RecipientUserID = @UserId
        AND LogID IN (${idParams})
    `;

    const result = await request.query(query);

    res.json({ message: "Notifications marked as read", rowsAffected: result.rowsAffected });
  } catch (err) {
    console.error("Error marking notifications as read:", err);
    res.status(500).send("Server Error");
  }
};
