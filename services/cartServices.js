import { parse } from "dotenv";
import { getDatabaseConnection } from "../database/db.js";

export const add = async ({ productId }, userId) => {
  const db = await getDatabaseConnection();
  try {
    const id = parseInt(productId, 10);
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

export const all = async (userId) => {
  const db = await getDatabaseConnection();
  try {
    const items = await db.all(
      `SELECT ci.id AS cartItemId, ci.quantity, p.title, p.artist, p.price FROM cart_items ci JOIN products p ON p.id = ci.product_id WHERE ci.user_id = ?`,
      [userId],
    );
    // const products = [];
    // items.forEach(async (item) => {
    //   const product = await db.get(`SELECT * FROM products WHERE id = ?`, [
    //     item.product_id,
    //   ]);
    //   const { image, title, artist, price } = product;
    //   products.push({
    //     cartItemId: image,
    //     quantity: item.quantity,
    //     title: title,
    //     artist: artist,
    //     price: price,
    //   });
    // });
    return items;
  } finally {
    await db.close();
  }
};

export const removeAll = async (userId) => {
  const db = await getDatabaseConnection();
  try {
    await db.run("DELETE FROM cart_items WHERE user_id = ?", [userId]);
  } finally {
    await db.close();
  }
};

export const remove = async (userId, { itemId }) => {
  const db = await getDatabaseConnection();
  const id = parseInt(itemId, 10);
  if (isNaN(itemId)) {
    throw new Error("Invalid item ID");
  }
  try {
    const item = await db.get(
      `SELECT quantity FROM cart_items WHERE id = ? AND user_id = ?`,
      [id, userId],
    );
    if (!item) {
      throw new Error("Item not found");
    }
    await db.run(`DELETE FROM cart_items WHERE id = ? AND user_id = ?`, [
      id,
      userId,
    ]);
  } finally {
    await db.close();
  }
};
