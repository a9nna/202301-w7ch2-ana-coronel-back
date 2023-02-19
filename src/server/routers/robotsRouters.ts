import { Router } from "express";
import { authentication } from "../controllers/authentication.js";
import {
  deleteRobotById,
  getRobotById,
  getRobots,
} from "../controllers/robotsControllers.js";

export const robotsRouter = Router();

robotsRouter.get("/", getRobots);
robotsRouter.get("/:idRobot", getRobotById);
robotsRouter.delete("/delete/:idRobot", authentication, deleteRobotById);
