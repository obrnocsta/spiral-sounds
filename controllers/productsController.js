import { genres, products } from "../services/productsServices.js";

export const getGenres = async (req, res) => {
  try {
    const data = await genres();
    res.json({ success: true, data: data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const data = await products(req.query);
    res.json({ success: true, data: data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
