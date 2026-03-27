import validator from "validator";
import bcrypt from "bcryptjs";
import { getDatabaseConnection } from "../database/db.js";

export const registerUser = async (req, res) => {
  let { name, email, username, password } = req.body;

  if (!name || !email || !username || !password) {
    res.status(400).json({ error: "All fields are required." });
    return;
  }

  name = name.trim();
  email = email.trim();
  username = username.trim();

  if (!/^[a-zA-Z0-9_-]{1,20}$/.test(username)) {
    res.status(400).json({
      error:
        "Username must be 1–20 characters, using letters, numbers, _ or -.",
    });
    return;
  }

  if (!validator.isEmail(email)) {
    res.status(400).json({ error: "Invalid email format" });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

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
    const newUser = await db.run(
      `INSERT INTO users (name, email, username, password) VALUES (?, ?, ?, ?)`,
      [name, email, username, hashedPassword],
    );
    req.session.userId = newUser.lastID;
    res.status(201).json({ message: "User registered" });
  } catch (error) {
    console.error(`Registration failed: ${error.message}`);
    res.status(500).json({ error: "Registration failed. Please try again." });
  } finally {
    await db.close();
  }
};

export const loginUser = async (req, res) => {
  let { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: "All fields are required." });
    return;
  }

  username = username.trim();

  if (!/^[a-zA-Z0-9_-]{1,20}$/.test(username)) {
    res.status(400).json({
      error:
        "Username must be 1–20 characters, using letters, numbers, _ or -.",
    });
    return;
  }

  const db = await getDatabaseConnection();
  try {
    const user = await db.get(`SELECT * FROM users WHERE username = ?`, [
      username,
    ]);
    if (!user) {
      res.status(400).json({ error: "Invalid credentials" });
      return;
    }
    const isValidPassword = bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      res.status(400).json({ error: "Invalid credentials" });
      return;
    }
    req.session.userId = user.id;
    res.json({ message: "Logged in" });
  } catch (error) {
    console.error(`Login failed: ${error.message}`);
    res.status(500).json({ error: "Login failed. Please try again." });
  } finally {
    await db.close();
  }
};
