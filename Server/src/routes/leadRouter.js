import { Router } from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { checkPermission } from "../middlewares/checkPermission.js";
import { createLead, createLeadSource, createLeadStatus, createLeadType, deleteLead, deleteLeadSource, deleteLeadStatus, deleteLeadType, exportLeads, getAllLeads, getAllUnassignedLeads, getLeadById, getLeadsForDropdown, getLeadSources, getLeadSourcesForDropdown, getLeadStatus, getLeadStatusForDropdown, getLeadTypes, getLeadTypesForDropdown, importLeads, updateLeadById, updateLeadSource, updateLeadStatus, updateLeadType } from "../controllers/lead.controller.js";

const leadRouter = Router();

leadRouter.get("/source", authenticate, checkPermission("ReadAccess", "My Leads"), getLeadSources);
leadRouter.get("/sourceDropdown", authenticate, checkPermission("ReadAccess", "My Leads"), getLeadSourcesForDropdown);
leadRouter.post("/source", authenticate, checkPermission("CreateAccess", "My Leads"), createLeadSource);
leadRouter.put("/source/:id", authenticate, checkPermission("UpdateAccess", "My Leads"), updateLeadSource);
leadRouter.delete("/source/:id", authenticate, checkPermission("DeleteAccess", "My Leads"), deleteLeadSource);

leadRouter.get("/status", authenticate, checkPermission("ReadAccess", "My Leads"), getLeadStatus);
leadRouter.get("/statusDropdown", authenticate, checkPermission("ReadAccess", "My Leads"), getLeadStatusForDropdown);
leadRouter.post("/status", authenticate, checkPermission("CreateAccess", "My Leads"), createLeadStatus);
leadRouter.put("/status/:id", authenticate, checkPermission("UpdateAccess", "My Leads"), updateLeadStatus);
leadRouter.delete("/status/:id", authenticate, checkPermission("DeleteAccess", "My Leads"), deleteLeadStatus);

leadRouter.get("/types", authenticate, checkPermission("ReadAccess", "My Leads"), getLeadTypes);
leadRouter.get("/typesDropdown", authenticate, checkPermission("ReadAccess", "My Leads"), getLeadTypesForDropdown);
leadRouter.post("/type", authenticate, checkPermission("CreateAccess", "My Leads"), createLeadType);
leadRouter.put("/type/:id", authenticate, checkPermission("UpdateAccess", "My Leads"), updateLeadType);
leadRouter.delete("/type/:id", authenticate, checkPermission("DeleteAccess", "My Leads"), deleteLeadType);

leadRouter.get("/newLeads", authenticate, checkPermission("ReadAccess", "My Leads"), getAllUnassignedLeads);
leadRouter.get("/export-csv", authenticate, checkPermission("ReadAccess", "My Leads"), exportLeads);
leadRouter.post("/bulk-import", authenticate, checkPermission("CreateAccess", "My Leads"), importLeads);

leadRouter.get("/dropdown", authenticate, checkPermission("ReadAccess", "My Leads"), getLeadsForDropdown);
leadRouter.get("/", authenticate, checkPermission("ReadAccess", "My Leads"), getAllLeads);
leadRouter.post("/", authenticate, checkPermission("CreateAccess", "My Leads"), createLead);

leadRouter.get("/:id", authenticate, checkPermission("ReadAccess", "My Leads"), getLeadById);
leadRouter.put("/:id", authenticate, checkPermission("UpdateAccess", "My Leads"), updateLeadById);
leadRouter.delete("/:id", authenticate, checkPermission("DeleteAccess", "My Leads"), deleteLead);

export default leadRouter;