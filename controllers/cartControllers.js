import { add } from "../services/cartServices.js";

export const addToCart = async (req, res) => {
  try {
    await add(req.body, req.session.userId);
    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
