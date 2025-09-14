import { Router } from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { checkPermission } from "../middlewares/checkPermission.js";
import { createLeadSource, createLeadStatus, createLeadType, deleteLeadSource, deleteLeadStatus, deleteLeadType, getLeadSources, getLeadStatus, getLeadTypes, updateLeadSource, updateLeadStatus, updateLeadType } from "../controllers/lead.controller.js";

const leadRouter = Router();

leadRouter.get("/source", authenticate, checkPermission("ReadAccess", "My Leads"), getLeadSources);
leadRouter.post("/source", authenticate, checkPermission("CreateAccess", "My Leads"), createLeadSource);
leadRouter.put("/source/:id", authenticate, checkPermission("UpdateAccess", "My Leads"), updateLeadSource);
leadRouter.delete("/source/:id", authenticate, checkPermission("DeleteAccess", "My Leads"), deleteLeadSource);

leadRouter.get("/status", authenticate, checkPermission("ReadAccess", "My Leads"), getLeadStatus);
leadRouter.post("/status", authenticate, checkPermission("CreateAccess", "My Leads"), createLeadStatus);
leadRouter.put("/status/:id", authenticate, checkPermission("UpdateAccess", "My Leads"), updateLeadStatus);
leadRouter.delete("/status/:id", authenticate, checkPermission("DeleteAccess", "My Leads"), deleteLeadStatus);

leadRouter.get("/types", authenticate, checkPermission("ReadAccess", "My Leads"), getLeadTypes);
leadRouter.post("/type", authenticate, checkPermission("CreateAccess", "My Leads"), createLeadType);
leadRouter.put("/type/:id", authenticate, checkPermission("UpdateAccess", "My Leads"), updateLeadType);
leadRouter.delete("/type/:id", authenticate, checkPermission("DeleteAccess", "My Leads"), deleteLeadType);

export default leadRouter;