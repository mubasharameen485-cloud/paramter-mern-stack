import express from "express";
import { getProducts, getSingleProduct } from "./controller.js";

const router = express.Router();

// Ye GET Request FILTER, SORT, aur PAGINATION handle karegi
// Browser Url: /api/products?category=Clothing&page=2
router.get("/", getProducts);

// Ye GET Request PATH parameter handle karegi (Single ID)
// Browser Url: /api/products/12345
router.get("/:id", getSingleProduct);

export default router;