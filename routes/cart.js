import express from "express";
import {
  addToCart,
  getCardCount,
  getAll,
  deleteAll,
  deleteItem,
} from "../controllers/cartControllers.js";
import { requireAuth } from "../middlewares/authMiddleware.js";

export const cartRouter = express.Router();

cartRouter.post("/add", requireAuth, addToCart);
cartRouter.get("/cart-count", requireAuth, getCardCount);
cartRouter.get("/", requireAuth, getAll);
cartRouter.delete("/all", requireAuth, deleteAll);
cartRouter.delete("/:itemId", requireAuth, deleteItem);
