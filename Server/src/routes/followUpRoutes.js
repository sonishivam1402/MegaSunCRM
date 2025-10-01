import { Router } from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { checkPermission } from "../middlewares/checkPermission.js";
import { createNewFollowUp, deleteFollowUpByFollowUpId, getFollowUpByFollowUpId, getFollowUpByLeadId, getFollowUps, updateFollowUpComment } from "../controllers/followUp.controller.js";

const followUpRouter = Router();

followUpRouter.get("/filter", authenticate, checkPermission("ReadAccess", "Followups"), getFollowUps);
followUpRouter.get("/lead/:id", authenticate, checkPermission("ReadAccess", "Followups"), getFollowUpByLeadId);
followUpRouter.get("/:id", authenticate, checkPermission("ReadAccess", "Followups"), getFollowUpByFollowUpId);

followUpRouter.put("/:id", authenticate, checkPermission("UpdateAccess", "Followups"), updateFollowUpComment);
followUpRouter.delete("/:id", authenticate, checkPermission("DeleteAccess", "Followups"), deleteFollowUpByFollowUpId);

followUpRouter.post("/", authenticate, checkPermission("UpdateAccess", "Followups"), createNewFollowUp);

export default followUpRouter;