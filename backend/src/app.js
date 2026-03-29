const express = require("express");
const path = require("path");
const cors = require("cors");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRouthes");

const app = express();

app.use(cors());
app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.get("/health", (req, res) => {
  res.json({ ok: true, service: "orvexa-backend" });
});

app.use("/api/v1/products", productRoutes);
app.use("/api/v1", authRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Orvexa backend is running.",
    productsApi: "/api/v1/products",
    authApi: "/api/v1/auth",
  });
});

module.exports = app;
