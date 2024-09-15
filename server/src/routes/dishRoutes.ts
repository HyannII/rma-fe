import { Router } from "express";
import { createDish, getDishes } from "../controllers/dishController";

const router = Router();

router.get("/", getDishes);
router.post("/", createDish);

export default router;
