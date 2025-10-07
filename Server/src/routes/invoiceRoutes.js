import { Router } from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { checkPermission } from "../middlewares/checkPermission.js";
import { getQuotationPdf } from "../controllers/invoice.controller.js";

const invoiceRouter = Router();

invoiceRouter.get("/:id", authenticate, checkPermission("ReadAccess", "Quotation"), getQuotationPdf);

export default invoiceRouter;
