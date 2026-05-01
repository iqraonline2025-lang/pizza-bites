import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import productRoutes from "./routes/ProductRoutes.js"; 
import authRoutes from './routes/authRoutes.js';

dotenv.config();

// --- ES MODULE PATH FIX ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Connect to MongoDB
connectDB();

// --- CORS CONFIGURATION (ALL 3 DOMAINS) ---
const allowedOrigins = [
  "http://localhost:3000",                  // 1. Local Development
  "https://your-main-domain.com",           // 2. Your Main Custom Domain
  "https://pizza-bites-virid.vercel.app",         // 3. Vercel Preview Domain
  process.env.FRONTEND_URL                  // 4. Backup (Set this in Render Dashboard)
].filter(Boolean); // Clean up empty values

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or Postman)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log("CORS Blocked Origin:", origin); // Helps debugging
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());

// --- SERVE UPLOADS FOLDER ---
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// --- ROUTES ---
app.use("/api/products", productRoutes);
app.use('/api/auth', authRoutes);

// Base Route
app.get("/", (req, res) => {
  res.send("Pizza Bites API is running...");
});

// Error Handling
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
