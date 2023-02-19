import { Router } from "express";
import { authentication } from "../middlewares/authentication.js";
import {
  createRobot,
  deleteRobotById,
  getRobotById,
  getRobots,
} from "../controllers/robotsControllers.js";

export const robotsRouter = Router();

robotsRouter.get("/", getRobots);
robotsRouter.get("/:idRobot", getRobotById);
robotsRouter.delete("/delete/:idRobot", authentication, deleteRobotById);
robotsRouter.delete("/delete/:idRobot", deleteRobotById);
robotsRouter.post("/create/", createRobot);
