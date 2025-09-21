import { Router } from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { checkPermission } from "../middlewares/checkPermission.js";
import { getProductOptions, getProducts } from "../controllers/product.controller.js";

const productRouter = Router();

productRouter.get("/", authenticate, checkPermission("ReadAccess", "Product Management"), getProducts);
productRouter.get("/products", authenticate, checkPermission("ReadAccess", "Product Management"), getProductOptions);

export default productRouter;