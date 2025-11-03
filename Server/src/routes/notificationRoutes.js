import { Router } from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { getUserNotifications, markAllNotificationAsRead, markNotificationAsRead } from "../controllers/notification.controller.js";

const notifyRouter = Router();

notifyRouter.put("/markAllAsRead", authenticate, markAllNotificationAsRead);
notifyRouter.get("/", authenticate, getUserNotifications);
notifyRouter.put("/:id", authenticate, markNotificationAsRead);

export default notifyRouter;