import validator from "validator";
import { getDatabaseConnection } from "../database/db.js";

export const registerUser = async (req, res) => {
  let { name, email, username, password } = req.body;

  if (!name || !email || !username || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  name = name.trim();
  email = email.trim();
  username = username.trim();

  if (!/^[a-zA-Z0-9_-]{1,20}$/.test(username)) {
    return res.status(400).json({
      error:
        "Username must be 1–20 characters, using letters, numbers, _ or -.",
    });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  const db = await getDatabaseConnection();
  try {
    const hasUser = await db.get(
      `SELECT id FROM users WHERE username = ? OR email = ?`,
      [username, email],
    );
    if (hasUser) {
      res.status(400).json({ error: "Email or username already in use." });
      return;
    }
    await db.run(
      `INSERT INTO users (name, email, username, password) VALUES (?, ?, ?, ?)`,
      [name, email, username, password],
    );
    res.status(201).json({ message: "User registered" });
  } catch (error) {
    console.error(`Registration failed: ${error.message}`);
    res.status(500).json({ error: "Registration failed. Please try again." });
  } finally {
    await db.close();
  }
};
