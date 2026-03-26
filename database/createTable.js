import { getDatabaseConnection } from "./db.js";

async function createTable() {
  const db = await getDatabaseConnection();

  await db.exec(`
      CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE NOT NULL,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

  await db.close();
  console.log("table created");
}

createTable();
