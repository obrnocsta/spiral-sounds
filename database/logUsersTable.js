import { getDatabaseConnection } from "./db.js";

async function logUsersTable() {
  const db = await getDatabaseConnection();

  try {
    const table = await db.all(`SELECT * FROM users`);
    console.table(table);
  } catch (err) {
    console.error("Error fetching table:", err.message);
  } finally {
    await db.close();
  }
}

logUsersTable();
