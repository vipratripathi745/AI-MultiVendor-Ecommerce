import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import pool from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import couponRoutes from "./routes/couponRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/payments", paymentRoutes);

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");

    res.json({
      success: true,
      message: "🚀 Backend Running Successfully",
      databaseTime: result.rows[0].now,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Database Connection Failed",
      error: error.message,
    });
  }
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});