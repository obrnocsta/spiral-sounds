import { getDatabaseConnection } from "./db.js";

async function logProductsTable() {
  const db = await getDatabaseConnection();

  try {
    const table = await db.all(`SELECT * FROM products`);
    console.table(table);
  } catch (err) {
    console.error("Error fetching table:", err.message);
  } finally {
    await db.close();
  }
}

logProductsTable();
