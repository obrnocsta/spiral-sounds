import { getDatabaseConnection } from "../database/db.js";

export const genres = async () => {
  const db = await getDatabaseConnection();
  try {
    const genres = await db.all("SELECT DISTINCT genre FROM products");
    return genres.map((row) => row.genre);
  } finally {
    await db.close();
  }
};

export const products = async (query) => {
  const db = await getDatabaseConnection();
  try {
    let sql = "SELECT * FROM products";
    let params = [];
    const { genre, search } = query;
    if (genre) {
      sql += " WHERE genre = ?";
      params.push(genre);
    }
    if (search) {
      sql += " WHERE title LIKE ? OR artist LIKE ? OR genre LIKE ?";
      const pattern = `%${search}%`;
      params.push(pattern, pattern, pattern);
    }
    return await db.all(sql, params);
  } finally {
    await db.close();
  }
};
