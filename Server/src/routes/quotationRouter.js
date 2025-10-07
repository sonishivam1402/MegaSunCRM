import { Router } from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { checkPermission } from "../middlewares/checkPermission.js";
import { createNewQuotation, deleteQuotationById, exportQuotations, getLastFollowUpByQuotationId, getQuotationById, getQuotations, updateQuotationById } from "../controllers/quotation.controller.js";

const quotationRouter = Router();

quotationRouter.put("/:id", authenticate, checkPermission("UpdateAccess", "Quotation"), updateQuotationById);
quotationRouter.get("/:id", authenticate, checkPermission("ReadAccess", "Quotation"), getQuotationById);
quotationRouter.get("/followup/:id", authenticate, checkPermission("ReadAccess", "Quotation"), getLastFollowUpByQuotationId);
quotationRouter.delete("/:id", authenticate, checkPermission("DeleteAccess", "Quotation"), deleteQuotationById);

quotationRouter.get("/export-csv", authenticate, checkPermission("ReadAccess", "Quotation"), exportQuotations)

quotationRouter.get("/", authenticate, checkPermission("ReadAccess", "Quotation"), getQuotations);
quotationRouter.post("/", authenticate, checkPermission("CreateAccess", "Quotation"), createNewQuotation);

export default quotationRouter;