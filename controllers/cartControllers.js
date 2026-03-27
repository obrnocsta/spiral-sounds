import { add, count } from "../services/cartServices.js";

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
    console.log({ data: quantity });
    res.json({ success: true, data: quantity || 0 });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
