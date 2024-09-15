import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getGoods = async (req: Request, res: Response): Promise<void> => {
  try {
    const search = req.query.search?.toString();
    const products = await prisma.goods.findMany({
      where: {
        name: {
          contains: search,
        },
      },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving products" });
  }
};

export const createGoods = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      id,
      quantity,
      name,
      type,
      averageImportPrice,
      weight,
      unit,
      sellingPrice,
    } = req.body;
    const goods = await prisma.goods.create({
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
  } catch (error) {
    res.status(500).json({ message: "Error creating product" });
  }
};

export const updateGoods = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const {
      quantity,
      name,
      type,
      averageImportPrice,
      weight,
      unit,
      sellingPrice,
    } = req.body;

    const updatedGoods = await prisma.goods.update({
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
  } catch (error) {
    res.status(500).json({ message: "Error updating product" });
  }
};
export const deleteGoods = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    await prisma.goods.delete({
      where: {
        id: Number(id), // Assuming `id` is a number, adjust if necessary
      },
    });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product" });
  }
};