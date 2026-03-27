import { getDatabaseConnection } from "./db.js";

async function dropTables() {
  const db = await getDatabaseConnection();

  await db.exec(`
      DROP TABLE IF EXISTS products;
    `);

  await db.exec(`
      DROP TABLE IF EXISTS users;
    `);

  await db.close();
  console.log("tables 'products' and 'users' dropped.");
}

dropTables();
