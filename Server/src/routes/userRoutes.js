import { Router } from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { checkPermission } from "../middlewares/checkPermission.js";
import { createUserType, getAllUsers, getUserById, getUserType, getUserTypeNames, updatePassword, updateUserbyId } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/", authenticate, checkPermission("ReadAccess","User Management"), getAllUsers);
userRouter.get("/userTypeNames", authenticate, checkPermission("ReadAccess","User Management"), getUserTypeNames);
userRouter.post("/userTypes", authenticate, checkPermission("ReadAccess","User Management"), getUserType);
userRouter.get("/:id", authenticate, checkPermission("ReadAccess","User Management"), getUserById);
userRouter.post("/createUserType", authenticate, checkPermission("CreateAccess","User Management"), createUserType);
userRouter.post("/updatePassword", authenticate, checkPermission("UpdateAccess","User Management"), updatePassword);
userRouter.post("/:id", authenticate, checkPermission("UpdateAccess","User Management"), updateUserbyId);

export default userRouter;