import {Router} from "express";
import {generateProduct} from "../controllers/product.controller";

const router = Router();

router.post("/generate",generateProduct);

export default router;