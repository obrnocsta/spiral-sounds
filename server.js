import "dotenv/config";
import express from "express";
import session from "express-session";
import { authRouter } from "./routes/auth.js";
import { productsRouter } from "./routes/products.js";

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

app.use("/api/auth", authRouter);
app.use("/api/products", productsRouter);

app
  .listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  })
  .on("error", (err) => {
    console.error("Failed to start server:", err);
  });
