import morgan from "morgan";
import express from "express";

export const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.get("/robots", (req, res) => {
  res.status(200).json({ pong: true });
});
