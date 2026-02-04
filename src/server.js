
import dotenv from "dotenv";
dotenv.config();
import express from "express";

import { connectDB } from "./config/db.js";
import healthRoutes from "./routes/health.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import askRoutes from "./routes/ask.routes.js";
import cors from "cors";



const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use(express.json());
await connectDB();


app.use("/api/health", healthRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/ask", askRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
