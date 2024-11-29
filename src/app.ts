import "reflect-metadata";

import express, { Application, NextFunction, Request, Response } from "express";
import loggerMiddleware from "./middleware/logger.middleware";

import task from "./routes/task.route";
import { HttpStatusCode } from "./types";
import errorMiddleware from "./middleware/error.middleware";

const app: Application = express();

app.use(express.json());

app.use(loggerMiddleware);

app.get("/", (req: Request, res: Response) => {
  res.status(HttpStatusCode.OK).json({ message: "Welcome to task-api!" });
});

app.use(task);

app.use(errorMiddleware);

export default app;
