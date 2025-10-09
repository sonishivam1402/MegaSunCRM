import { Router } from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { checkPermission } from "../middlewares/checkPermission.js";
import { getOrderById, getLastFollowUpByOrderId, deleteOrderById, getOrders, exportOrders, createNewOrder, updateOrderById } from "../controllers/order.controller.js";

const orderRouter = Router();

orderRouter.get("/export-csv", authenticate, checkPermission("ReadAccess", "Order"), exportOrders);
orderRouter.get("/:id", authenticate, checkPermission("ReadAccess", "Order"), getOrderById);
orderRouter.get("/last-followup/:id", authenticate, checkPermission("ReadAccess", "Order"), getLastFollowUpByOrderId);
orderRouter.delete("/:id", authenticate, checkPermission("DeleteAccess", "Order"), deleteOrderById);
orderRouter.get("/", authenticate, checkPermission("ReadAccess", "Order"), getOrders);
orderRouter.post("/", authenticate, checkPermission("CreateAccess", "Order"), createNewOrder);
orderRouter.put("/:id", authenticate, checkPermission("UpdateAccess", "Order"), updateOrderById);

export default orderRouter;