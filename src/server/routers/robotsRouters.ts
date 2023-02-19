import { Router } from "express";
import {
  deleteRobotById,
  getRobotById,
  getRobots,
} from "../controllers/robotsControllers.js";

export const robotsRouter = Router();

robotsRouter.get("/", getRobots);
robotsRouter.get("/:idRobot", getRobotById);
robotsRouter.delete("/delete/:idRobot", deleteRobotById);
