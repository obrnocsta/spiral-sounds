import { getDatabaseConnection } from "../database/db.js";

export const getCurrentUser = async (req, res) => {
  try {
    const db = await getDatabaseConnection();

    if (!req.session.userId) {
      res.json({ isLoggedIn: false });
      return;
    }

    const user = await db.get(`SELECT name FROM users WHERE id = ?`, [
      req.session.userId,
    ]);

    res.json({ isLoggedIn: true, name: user.name });
  } catch (error) {
    console.error("getCurrentUser error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
