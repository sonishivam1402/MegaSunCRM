import { Router } from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { checkPermission } from "../middlewares/checkPermission.js";
import { getAllUsers, getUserById, getUserTypes, updatePassword, updateUserbyId } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/", authenticate, checkPermission("ReadAccess","User Management"), getAllUsers);
userRouter.get("/userTypes", authenticate, checkPermission("ReadAccess","User Management"), getUserTypes);
userRouter.get("/:id", authenticate, checkPermission("ReadAccess","User Management"), getUserById);
userRouter.post("/updatePassword", authenticate, checkPermission("UpdateAccess","User Management"), updatePassword);
userRouter.post("/:id", authenticate, checkPermission("UpdateAccess","User Management"), updateUserbyId);

export default userRouter;