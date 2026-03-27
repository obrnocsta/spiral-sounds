import express from "express";
import { addToCart, getCardCount } from "../controllers/cartControllers.js";

export const cartRouter = express.Router();

cartRouter.post("/add", addToCart);
cartRouter.get("/cart-count", getCardCount);
