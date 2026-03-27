import { getDatabaseConnection } from "../database/db.js";
import validator from "validator";
import bcrypt from "bcryptjs";

export const register = async ({ name, email, username, password }) => {
  const db = await getDatabaseConnection();
  try {
    if (!name || !email || !username || !password) {
      throw new Error("All fields are required");
    }
    name = name.trim();
    email = email.trim();
    username = username.trim();
    if (!/^[a-zA-Z0-9_-]{1,20}$/.test(username)) {
      throw new Error(
        "Username must be 1–20 characters, using letters, numbers, _ or -",
      );
    }
    if (!validator.isEmail(email)) {
      throw new Error("Invalid email format");
    }
    const passwordHashed = await bcrypt.hash(password, 10);
    const hasUser = await db.get(
      `SELECT id FROM users WHERE username = ? OR email = ?`,
      [username, email],
    );
    if (hasUser) {
      throw new Error("Email or username already in use");
    }
    const newUser = await db.run(
      `INSERT INTO users (name, email, username, password) VALUES (?, ?, ?, ?)`,
      [name, email, username, passwordHashed],
    );
    return newUser.lastID;
  } finally {
    await db.close();
  }
};

export const login = async ({ username, password }) => {
  const db = await getDatabaseConnection();
  try {
    if (!username || !password) {
      throw new Error("All fields are required");
    }
    username = username.trim();
    if (!/^[a-zA-Z0-9_-]{1,20}$/.test(username)) {
      throw new Error(
        "Username must be 1–20 characters, using letters, numbers, _ or -",
      );
    }
    const user = await db.get(`SELECT * FROM users WHERE username = ?`, [
      username,
    ]);
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error("Invalid credentials");
    }
    return user;
  } finally {
    await db.close();
  }
};
