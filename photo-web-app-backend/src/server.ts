import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { sequelize } from "./config/database";
import authRoutes from "./routes/auth";
import entryRoutes from "./routes/entries";
import adminRoutes from "./routes/admin";

dotenv.config();

const app = express();

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use(
  cors({
    origin: "http://127.0.0.1:5173", // Replace with your frontend URL
    credentials: true,
  })
);

app.use(express.json());

// Serve static files from the uploads directory
app.use("/uploads", express.static(uploadsDir));

app.use("/api/entries", entryRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.sync();
    console.log("Database synced");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to start server:", error);
  }
};

startServer();
