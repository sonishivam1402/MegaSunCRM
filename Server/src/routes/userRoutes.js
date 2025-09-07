import { Router } from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { checkPermission } from "../middlewares/checkPermission.js";
import { createNewUser, createUserType, getAllUsers, getUserById, getUserType, getUserTypeById, getUserTypeNames, updatePassword, updateUserbyId, updateUserTypeById } from "../controllers/user.controller.js";
import multer from "multer";

const userRouter = Router();

// Multer config (store file in memory for S3 upload)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Most specific routes first
userRouter.post('/createNewUser', authenticate, checkPermission("CreateAccess", "User Management"), upload.single("imageFile"), createNewUser);

userRouter.get("/userTypeNames", authenticate, checkPermission("ReadAccess","User Management"), getUserTypeNames);
userRouter.post("/userTypes", authenticate, checkPermission("ReadAccess","User Management"), getUserType);
userRouter.get("/userTypes/:id", authenticate, checkPermission("ReadAccess","User Management"), getUserTypeById);
userRouter.post("/userTypes/:id", authenticate, checkPermission("UpdateAccess","User Management"), updateUserTypeById);
userRouter.post("/createUserType", authenticate, checkPermission("CreateAccess","User Management"), createUserType);
userRouter.post("/updatePassword", authenticate, checkPermission("UpdateAccess","User Management"), updatePassword);

// Core user routes
userRouter.get("/", authenticate, checkPermission("ReadAccess","User Management"), getAllUsers);

// Dynamic user routes (must come last to avoid conflicts)
userRouter.get("/:id", authenticate, checkPermission("ReadAccess","User Management"), getUserById);
userRouter.post("/:id", authenticate, checkPermission("UpdateAccess","User Management"), upload.single("imageFile"), updateUserbyId);


export default userRouter;