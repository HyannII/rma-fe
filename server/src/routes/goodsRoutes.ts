import { Router } from "express";
import { createGoods, deleteGoods, getGoods, updateGoods } from "../controllers/goodsController";

const router = Router();

router.get("/", getGoods);
router.post("/", createGoods);
router.put("/:id", updateGoods);
router.delete("/:id", deleteGoods);

export default router;