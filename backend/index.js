import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"; // 👈 Ye import karna zaroori hai
import productRoutes from "./paramter/route.js"; 

dotenv.config();
const app = express();

// ==========================================
// MIDDLEWARES (CORS fix)
// ==========================================
app.use(cors()); // 👈 Ye line Browser ko ijazat deti hai data allow karne ki
app.use(express.json());

// ==========================================
// DATABASE CONNECTION
// ==========================================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(" DB Error", err));

// ==========================================
// ROUTES
// ==========================================
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));