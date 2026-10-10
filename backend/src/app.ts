import express from "express";
import cors from "cors";
import productRoutes from "./routes/product.routes";

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
}));

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Product Card Generator API is running."
  });
});

app.use("/api/products", productRoutes);

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found."
  });
});

export default app;