import { Router } from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { checkPermission } from "../middlewares/checkPermission.js";
import { createNewFollowUp, getFollowUpByLeadId, getFollowUps, updateFollowUpComment } from "../controllers/followUp.controller.js";

const followUpRouter = Router();

followUpRouter.get("/:id", authenticate, checkPermission("ReadAccess", "Followups"), getFollowUpByLeadId);
followUpRouter.get("/", authenticate, checkPermission("ReadAccess", "Followups"), getFollowUps);

followUpRouter.put("/:id", authenticate, checkPermission("UpdateAccess", "Followups"), updateFollowUpComment);

followUpRouter.post("/", authenticate, checkPermission("UpdateAccess", "Followups"), createNewFollowUp);

export default followUpRouter;