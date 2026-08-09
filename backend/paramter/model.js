import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true }, // Misaal: Electronics, Clothing
  price: { type: Number, required: true },
  rating: { type: Number, default: 0 },
});

export default mongoose.model("Product", ProductSchema);