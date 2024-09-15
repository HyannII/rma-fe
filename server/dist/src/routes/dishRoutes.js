"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dishController_1 = require("../controllers/dishController");
const router = (0, express_1.Router)();
router.get("/", dishController_1.getDishes);
router.post("/", dishController_1.createDish);
exports.default = router;
