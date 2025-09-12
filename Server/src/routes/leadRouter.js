import { Router } from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { checkPermission } from "../middlewares/checkPermission.js";
import { createLeadSource, createLeadStatus, createLeadType, getLeadSources, getLeadStatus, getLeadTypes, updateLeadSource, updateLeadStatus, updateLeadType } from "../controllers/lead.controller.js";

const leadRouter = Router();

leadRouter.get("/source", authenticate, checkPermission("ReadAccess", "My Leads"), getLeadSources);
leadRouter.post("/source", authenticate, checkPermission("CreateAccess", "My Leads"), createLeadSource);
leadRouter.post("/source/:id", authenticate, checkPermission("UpdateAccess", "My Leads"), updateLeadSource);

leadRouter.get("/status", authenticate, checkPermission("ReadAccess", "My Leads"), getLeadStatus);
leadRouter.post("/status", authenticate, checkPermission("CreateAccess", "My Leads"), createLeadStatus);
leadRouter.post("/status/:id", authenticate, checkPermission("UpdateAccess", "My Leads"), updateLeadStatus);

leadRouter.get("/types", authenticate, checkPermission("ReadAccess", "My Leads"), getLeadTypes);
leadRouter.post("/type", authenticate, checkPermission("CreateAccess", "My Leads"), createLeadType);
leadRouter.post("/type/:id", authenticate, checkPermission("UpdateAccess", "My Leads"), updateLeadType);

export default leadRouter;