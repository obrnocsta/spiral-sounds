import "dotenv/config";
import express from "express";
import session from "express-session";
import { meRouter } from "./routes/me.js";
import { authRouter } from "./routes/auth.js";
import { productsRouter } from "./routes/products.js";
import { cartRouter } from "./routes/cart.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(
  session({
    secret: process.SECRET_SESSION_KEY || "BRUNORENATAJESSICA",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    },
  }),
);
app.use(express.static("public"));

app.use("/api/products", productsRouter);
app.use("/api/auth/me", meRouter);
app.use("/api/auth", authRouter);
app.use("/api/cart", cartRouter);

app
  .listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  })
  .on("error", (err) => {
    console.error("Failed to start server:", err);
  });
