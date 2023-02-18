import { Router } from "express";
import { getRobots } from "../controllers/robotsControllers.js";

export const robotsRouter = Router();

robotsRouter.get("/", getRobots);
