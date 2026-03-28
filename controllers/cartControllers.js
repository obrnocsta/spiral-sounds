import { parse } from "dotenv";
import { add, count, all, remove } from "../services/cartServices.js";

export const addToCart = async (req, res) => {
  try {
    await add(req.body, req.session.userId);
    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getCardCount = async (req, res) => {
  try {
    const quantity = await count(req.session.userId);
    res.json({ success: true, data: quantity || 0 });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getAll = async (req, res) => {
  try {
    const items = await all(req.session.userId);
    res.json({ success: true, items: items });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const deleteItem = async (req, res) => {
  try {
    await remove(req.session.userId, req.params);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
