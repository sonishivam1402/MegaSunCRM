import { Router } from "express";
import { indiaMartWebhook } from "../controllers/webhook.controller.js";

const indiaMartRouter = Router();

indiaMartRouter.post("/webhook", indiaMartWebhook);

export default indiaMartRouter;