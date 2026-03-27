import { register, login } from "../services/authServices.js";

export const registerUser = async (req, res) => {
  try {
    const newUserId = await register(req.body);
    req.session.userId = newUserId;
    res.status(201).json({ success: true, message: "User registered" });
  } catch (error) {
    res.status().json({ success: false, message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const user = await login(req.body);
    req.session.userId = user.id;
    res.json({ success: true, message: "Logged in" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const logoutUser = async (req, res) => {
  req.session.destroy(() => {
    res.json({ success: true, message: "Logged out" });
  });
};
