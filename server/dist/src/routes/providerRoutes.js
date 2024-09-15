"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const providerController_1 = require("../controllers/providerController");
const router = (0, express_1.Router)();
router.get("/", providerController_1.getProviders);
router.post("/", providerController_1.createProvider);
exports.default = router;
