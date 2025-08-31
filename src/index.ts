import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "This is auth service!" });
});

app.listen(port, () => {
  console.log(`Server app listening on port ${port}`);
});
