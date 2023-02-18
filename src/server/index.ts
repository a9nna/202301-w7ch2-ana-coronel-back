import morgan from "morgan";
import express from "express";
import { generalError, notFoundError } from "./middlewares/errorMiddlewares.js";
import { robotsRouter } from "./routers/robotsRouters.js";

export const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/robots", robotsRouter);

app.use(notFoundError);
app.use(generalError);
