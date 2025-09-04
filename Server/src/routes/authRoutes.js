import { Router } from "express";
import { createNewUser, logout, refreshToken, signIn } from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import { checkPermission } from "../middlewares/checkPermission.js";

const authRouter = Router();

authRouter.post('/createNewUser', authenticate, checkPermission("CreateAccess", "User Management"), createNewUser);
authRouter.post('/sign-in' , signIn);
authRouter.post('/refreshToken' , refreshToken);
authRouter.post('/logout' , logout);

export default authRouter;