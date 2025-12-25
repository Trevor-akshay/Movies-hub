import express, { NextFunction } from "express";
import cookieParser from "cookie-parser";

import logger from "./middleware/logger.ts";
import errorHandler from "./middleware/errorHandler.ts";
import moviesRouter from "./routes/movies.routes.ts";

import { PORT } from "./config/config.js";
import { prisma } from "./db/prisma.ts";
import authRouter from "./routes/auth.routes.ts";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(logger);

app.use("/api/v1/movies", moviesRouter);
app.use("/api/v1/auth", authRouter);

app.use("*all", (_req, _res, next: NextFunction) => {
  const error: any = new Error("Endpoint unavailable");
  error.status = 405;
  next(error);
});

app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  prisma
    .$connect()
    .then(() => {
      console.log("Connected to the database");
    })
    .catch((error) => {
      console.error("Database connection error:", error);
    });
});
