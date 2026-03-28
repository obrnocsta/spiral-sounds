import express from "express";
import {
  addToCart,
  getCardCount,
  getAll,
  deleteItem,
} from "../controllers/cartControllers.js";

export const cartRouter = express.Router();

cartRouter.post("/add", addToCart);
cartRouter.get("/cart-count", getCardCount);
cartRouter.get("/", getAll);
cartRouter.delete("/:itemId", deleteItem);
