import { getDatabaseConnection } from "./db.js";
import { data } from "./data.js";

const seedProductsTable = async () => {
  const db = await getDatabaseConnection();
  try {
    await db.exec(`BEGIN TRANSACTION`);
    for (const { title, artist, price, image, year, genre, stock } of data) {
      await db.run(
        `INSERT INTO products (title, artist, price, image, year, genre, stock) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [title, artist, price, image, year, genre, stock],
      );
    }
    await db.exec(`COMMIT`);
    console.log("All recors inserted.");
  } catch (error) {
    await db.exec(`ROLLBACK`);
    console.error("Error seed table:", error.message);
  } finally {
    await db.close();
  }
};

seedProductsTable();
