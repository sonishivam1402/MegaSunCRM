import { Router } from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { checkPermission } from "../middlewares/checkPermission.js";
import { getOrderById, deleteOrderById, getOrders, exportOrders, createNewOrder, updateOrderById, getFollowUpByOrderId, dispatchOrderById } from "../controllers/order.controller.js";

const orderRouter = Router();

orderRouter.get("/export-csv", authenticate, checkPermission("ReadAccess", "Orders"), exportOrders);
orderRouter.get("/:id", authenticate, checkPermission("ReadAccess", "Orders"), getOrderById);
orderRouter.get("/last-followup/:id", authenticate, checkPermission("ReadAccess", "Orders"), getFollowUpByOrderId);
orderRouter.delete("/:id", authenticate, checkPermission("DeleteAccess", "Orders"), deleteOrderById);
orderRouter.get("/", authenticate, checkPermission("ReadAccess", "Orders"), getOrders);
orderRouter.post("/", authenticate, checkPermission("CreateAccess", "Orders"), createNewOrder);
orderRouter.put("/dispatch/:id", authenticate, checkPermission("UpdateAccess", "Orders"), dispatchOrderById);
orderRouter.put("/:id", authenticate, checkPermission("UpdateAccess", "Orders"), updateOrderById);

export default orderRouter;