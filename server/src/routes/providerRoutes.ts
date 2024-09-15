import { Router } from "express";
import { createProvider, getProviders } from "../controllers/providerController";

const router = Router();

router.get("/", getProviders);
router.post("/", createProvider);

export default router;
