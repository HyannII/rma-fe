import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Fetch dishes based on a search term
export const getDishes = async (req: Request, res: Response): Promise<void> => {
  try {
    const search = req.query.search?.toString();
    const dishes = await prisma.dish.findMany({
      where: {
        name: {
          contains: search,
        },
      },
    });
    res.json(dishes);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving dishes" });
  }
};

// Create a new dish with ingredients
export const createDish = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      name,
      unit,
      price,
      type,
      ingredients, // Expected to be an array of { goodsId, quantity }
    } = req.body;

    // Create the dish
    const dish = await prisma.dish.create({
      data: {
        name,
        unit,
        price,
        type,
        ingredients: {
          create: ingredients.map((ingredient: { goodsId: number; quantity: number }) => ({
            goods: { connect: { id: ingredient.goodsId } },
            quantity: ingredient.quantity,
          })),
        },
      },
      include: {
        ingredients: {
          include: {
            goods: true,
          },
        },
      },
    });
    res.status(201).json(dish);
  } catch (error) {
    res.status(500).json({ message: "Error creating dish" });
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