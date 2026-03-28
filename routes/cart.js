import express from "express";
import {
  addToCart,
  getCardCount,
  getAll,
  deleteAll,
  deleteItem,
} from "../controllers/cartControllers.js";

export const cartRouter = express.Router();

cartRouter.post("/add", addToCart);
cartRouter.get("/cart-count", getCardCount);
cartRouter.get("/", getAll);
cartRouter.delete("/all", deleteAll);
cartRouter.delete("/:itemId", deleteItem);
