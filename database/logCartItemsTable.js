import { getDatabaseConnection } from "./db.js";

async function logProductsTable() {
  const db = await getDatabaseConnection();

  try {
    const table = await db.all(`SELECT * FROM cart_items`);
    console.table(table);
  } catch (err) {
    console.error("Error fetching table:", err.message);
  } finally {
    await db.close();
  }
}

logProductsTable();
