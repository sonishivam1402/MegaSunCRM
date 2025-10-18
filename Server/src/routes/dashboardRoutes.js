import { Router } from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { checkPermission } from "../middlewares/checkPermission.js";
import { getDashboardDetails } from "../controllers/dashboard.controller.js";

const dashboardRouter = Router();

dashboardRouter.get("/", authenticate, checkPermission("ReadAccess", "Dashboard"), getDashboardDetails);

export default dashboardRouter;