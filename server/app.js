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

const allowedOrigins = [
  'http://localhost:5173',
  'https://portfolio-rohit-ohbne847e-rohit-vishwakarmas-projects-95176ae8.vercel.app',
  'https://rohit-portfolio-server-2grr5.ondigitalocean.app/'
];

app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes Import
import userRouter from "./src/routes/user.routes.js";

// Routes declaration
app.use("/api/v1/admin", userRouter);

export { app };
