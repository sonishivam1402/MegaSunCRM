// routes/facebookroutes.js
import { Router } from "express";
import {
  facebookWebhookVerify,
  facebookWebhookLead,
} from "../controllers/facebook.controller.js";

const facebookRouter = Router();

// GET for webhook verification (used when setting up webhook in FB App)
facebookRouter.get("/webhook", facebookWebhookVerify);

// POST for receiving leads
facebookRouter.post("/webhook", facebookWebhookLead);

export default facebookRouter;
