import morgan from "morgan";
import express from "express";
import { generalError, notFoundError } from "./middlewares/errorMiddlewares";
import { robotsRouter } from "./routers/robotsRouters";

export const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.get("/robots", robotsRouter);

app.use(notFoundError);
app.use(generalError);
