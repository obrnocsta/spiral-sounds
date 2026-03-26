import { getDatabaseConnection } from "./db.js";

async function dropTable() {
  const db = await getDatabaseConnection();

  await db.exec(`
      DROP TABLE IF EXISTS users;
    `);

  await db.close();
  console.log("table dropped");
}

dropTable();
