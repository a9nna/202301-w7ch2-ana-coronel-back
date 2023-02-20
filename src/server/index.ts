import morgan from "morgan";
import express from "express";
import cors from "cors";
import { generalError, notFoundError } from "./middlewares/errorMiddlewares.js";
import { robotsRouter } from "./routers/robotsRouters.js";
import usersRouter from "./routers/usersRouters.js";

export const app = express();

app.disable("x-powered-by");

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use("/robots", robotsRouter);
app.use("/users", usersRouter);

app.use("/", notFoundError);
app.use("/", generalError);
