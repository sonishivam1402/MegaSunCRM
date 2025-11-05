import { Router } from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { checkPermission } from "../middlewares/checkPermission.js";
import { getDashboardDetails, getProductsByRange } from "../controllers/dashboard.controller.js";

const dashboardRouter = Router();

dashboardRouter.get("/products", authenticate, checkPermission("ReadAccess", "Dashboard"), getProductsByRange);
dashboardRouter.get("/", authenticate, checkPermission("ReadAccess", "Dashboard"), getDashboardDetails);


export default dashboardRouter;