import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

dotenv.config();

const app = express();

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiter to all requests
app.use(limiter);

// Security Headers
app.use(helmet());

app.use(
  cors({
    origin: [
      'https://portfolio-rohit-mu.vercel.app',
      
      "http://localhost:5173", // for local development
    ],
    credentials: true,
     // Allow cookies to be sent with requests
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes Import
import userRouter from "./src/routes/user.routes.js";

// Routes declaration
app.use("/api/v1/admin", userRouter);

export { app };
