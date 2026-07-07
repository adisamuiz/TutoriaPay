import express from "express";
const router = express.Router();
import { verifyAndReceiveWebhook } from "../controllers/webhook.controller.js";

router.post('/nomba-payments', verifyAndReceiveWebhook);

export default router;