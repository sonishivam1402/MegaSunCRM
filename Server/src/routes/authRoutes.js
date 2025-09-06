import { Router } from "express";
import { logout, refreshToken, signIn } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post('/sign-in' , signIn);
authRouter.post('/refreshToken' , refreshToken);
authRouter.post('/logout' , logout);

export default authRouter;