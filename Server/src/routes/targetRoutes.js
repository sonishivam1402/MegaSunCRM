import { Router } from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { checkPermission } from "../middlewares/checkPermission.js";
import { createTarget, getOrderByUserIdAndMonth, getTargetByUserId, getTargets } from "../controllers/target.controller.js";

const targetRouter = Router();

targetRouter.get("/:id", authenticate, checkPermission("ReadAccess", "Target"), getTargetByUserId);
targetRouter.get("/order", authenticate, checkPermission("ReadAccess", "Target"), getOrderByUserIdAndMonth);
targetRouter.get("/", authenticate, checkPermission("ReadAccess", "Target"), getTargets);
targetRouter.post("/", authenticate, checkPermission("CreateAccess", "Target"), createTarget);

export default targetRouter;