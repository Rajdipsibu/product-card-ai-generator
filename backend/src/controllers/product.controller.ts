
import type { Request, Response, NextFunction } from "express";
import { generateProductDetails } from "../services/ai.service";

export async function generateProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { productName, category } = req.body;

    if (
      typeof productName !== "string" ||
      !productName.trim() ||
      typeof category !== "string" ||
      !category.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Product name and category are required.",
      });
    }

    const product = await generateProductDetails(
      productName.trim(),
      category.trim()
    );

    return res.status(200).json({
      success: true,
      message: "Product details generated successfully.",
      data: product,
    });
  } catch (error) {
    next(error);
  }
}
