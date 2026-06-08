import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRouter from "../router/user.router";
import boardRouter from "../router/board.router";
import { authMiddleware } from "./authMiddleware";
import fileUpload from "express-fileupload";

const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || "http://localhost:5173,http://localhost:3000").split(",");

const createServer = () => {
  const app = express();

  app.use(cors({
    origin: (origin, callback) => {
      if (!origin || ALLOWED_ORIGINS.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }));

  app.use(express.json({ limit: "10kb" }));
  app.use(morgan("dev"));
  app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    limits: { fileSize: 5 * 1024 * 1024 },
  }));

  app.use("/api/auth", authRouter);
  app.use("/api/boards", authMiddleware, boardRouter);

  return app;
};

export default createServer;
