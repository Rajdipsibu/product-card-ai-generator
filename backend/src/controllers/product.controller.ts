import type{Request,Response}from "express";
import {generateProductDetails} from "../services/ai.service";

export async function generateProduct(req:Request,res:Response):Promise<void>{
  try{
    const {productName,category} = req.body as {
      productName?:unknown;
      category?:unknown;
    }

    if(typeof productName !== "string" || typeof category !== "string" || !productName.trim() || !category.trim()){
      res.status(400).json({
        sucess:false,
        message:"Product name or category exceeds the allowed length."
      });
      return;
    }

    const product = await generateProductDetails(productName.trim(),category.trim());

    res.status(200).json({
      success:true,
      message:"Product details generated successfully.",
      data:product
    });

  }catch(error){
    res.status(502).json({
      status:false,
      message:
      error instanceof Error && 
      error.message === "The AI returned an invalid product response." ? error.message: "Unable to generate product details right now. Please try again."
    });
  }
}