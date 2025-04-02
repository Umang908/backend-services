const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./src/routes/authRoutes");
const dataRoutes = require("./src/routes/dataRoutes");
const { swaggerUi, swaggerSpec } = require("./src/swagger");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Swagger Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", dataRoutes);  // Data routes

// API Test Route
app.get("/", (req, res) => {
  res.send("Backend-as-a-Service API is running...");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
