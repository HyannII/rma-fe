"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGoods = exports.updateGoods = exports.createGoods = exports.getGoods = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getGoods = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const search = (_a = req.query.search) === null || _a === void 0 ? void 0 : _a.toString();
        const products = yield prisma.goods.findMany({
            where: {
                name: {
                    contains: search,
                },
            },
        });
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving products" });
    }
});
exports.getGoods = getGoods;
const createGoods = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, quantity, name, type, averageImportPrice, weight, unit, sellingPrice, } = req.body;
        const goods = yield prisma.goods.create({
            data: {
                id,
                quantity,
                name,
                type,
                averageImportPrice,
                weight,
                unit,
                sellingPrice,
            },
        });
        res.status(201).json(goods);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating product" });
    }
});
exports.createGoods = createGoods;
const updateGoods = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { quantity, name, type, averageImportPrice, weight, unit, sellingPrice, } = req.body;
        const updatedGoods = yield prisma.goods.update({
            where: {
                id: Number(id), // Assuming `id` is a number, adjust if necessary
            },
            data: {
                quantity,
                name,
                type,
                averageImportPrice,
                weight,
                unit,
                sellingPrice,
            },
        });
        res.status(200).json(updatedGoods);
    }
    catch (error) {
        res.status(500).json({ message: "Error updating product" });
    }
});
exports.updateGoods = updateGoods;
const deleteGoods = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield prisma.goods.delete({
            where: {
                id: Number(id), // Assuming `id` is a number, adjust if necessary
            },
        });
        res.status(200).json({ message: "Product deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting product" });
    }
});
exports.deleteGoods = deleteGoods;
