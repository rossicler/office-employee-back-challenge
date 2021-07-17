import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import cors from "cors";
import mongoose from "mongoose";

import { router } from "./routes";

const app = express();

app.use(cors());

app.use(express.json());

mongoose
  .connect("mongodb://db:27017/office-employee", {
    useNewUrlParser: true,
  })
  .then((result) => {
    console.log("MongoDB Conectado");
  })
  .catch((error) => {
    console.log(error);
  });

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
      response.status(400).json({
        error: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
);

app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}`)
);
