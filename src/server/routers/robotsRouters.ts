import { Router } from "express";
import { getRobotById, getRobots } from "../controllers/robotsControllers.js";

export const robotsRouter = Router();

robotsRouter.get("/", getRobots);
robotsRouter.get("/:id", getRobotById);
