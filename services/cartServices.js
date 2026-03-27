import { getDatabaseConnection } from "../database/db.js";

export const add = async ({ productId }, userId) => {
  const db = await getDatabaseConnection();
  try {
    const id = parseInt(productId);
    if (isNaN(id)) {
      throw new Error("Invalid product ID");
    }
    const hasInCart = await db.get(
      `SELECT * FROM cart_items WHERE user_id = ? AND product_id = ?`,
      [userId, productId],
    );
    if (hasInCart) {
      await db.run(
        `UPDATE cart_items SET quantity = quantity + 1 WHERE id = ?`,
        [hasInCart.id],
      );
    } else {
      await db.run(
        `INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, 1)`,
        [userId, productId],
      );
    }
  } finally {
    await db.close();
  }
};

export const count = async (userId) => {
  const db = await getDatabaseConnection();
  try {
    const quantity = await db.get(
      `SELECT SUM(quantity) AS totalItems FROM cart_items WHERE user_id = ?`,
      [userId],
    );
    return quantity;
  } finally {
    await db.close();
  }
};
