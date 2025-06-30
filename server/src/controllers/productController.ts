import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const search = req.query.search?.toString();
    const page = parseInt(req.query.page?.toString() || "1");
    const limit = parseInt(req.query.limit?.toString() || "10");
    const skip = (page - 1) * limit;

    // Thực hiện truy vấn với pagination
    const [products, totalCount] = await Promise.all([
      prisma.products.findMany({
        where: {
          name: {
            contains: search || undefined,
          },
        },
        skip,
        take: limit,
        orderBy: {
          name: "asc",
        },
      }),
      prisma.products.count({
        where: {
          name: {
            contains: search || undefined,
          },
        },
      }),
    ]);

    // Trả về dữ liệu với metadata pagination
    res.json({
      products,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        hasMore: page < Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error("Error retrieving products:", error);
    res.status(500).json({ message: "Error retrieving products" });
  }
};

export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { productId, name, price, rating, stockQuantity } = req.body;
    const product = await prisma.products.create({
      data: {
        productId,
        name,
        price,
        rating,
        stockQuantity,
      },
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error creating product" });
  }
};
