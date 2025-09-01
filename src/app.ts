import express, { Express } from "express";
import cookieParser from "cookie-parser";
import { errorHandler } from "./exceptions/error_handler.exception";

const app: Express = express();

app.use(express.json());
app.use(cookieParser())
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Auth Service",
  });
});
app.use(errorHandler)

export default app;