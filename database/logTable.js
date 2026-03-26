import { getDatabaseConnection } from "./db.js";

async function logTable() {
  const db = await getDatabaseConnection();

  const tableName = "users";

  try {
    const table = await db.all(`SELECT * FROM ${tableName}`);
    console.table(table);
  } catch (err) {
    console.error("Error fetching table:", err.message);
  } finally {
    await db.close();
  }
}

logTable();
