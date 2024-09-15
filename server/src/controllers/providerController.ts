import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProviders = async (req: Request, res: Response): Promise<void> => {
  try {
    const search = req.query.search?.toString();
    const providers = await prisma.provider.findMany({
      where: {
        name: {
          contains: search,
        },
      },
    });
    res.json(providers);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving providers" });
  }
};

export const createProvider = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
        id,
        name,
        address,
        contactInfo
    } = req.body;
    const provider = await prisma.provider.create({
      data: {
            id,
            name,
            address,
          contactInfo
      },
    });
    res.status(201).json(provider);
  } catch (error) {
    res.status(500).json({ message: "Error creating provider" });
  }
};
