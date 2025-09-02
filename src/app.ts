import express, { Express } from "express";
import cookieParser from "cookie-parser";
import v1Route from "./routes/v1.route"
import { errorHandler } from "./exceptions/error_handler.exception";

const app: Express = express();

app.use(cookieParser());
app.use(express.json());
app.use("/api/v1/", v1Route);
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Auth Service",
  });
});
app.use(errorHandler)

export default app;