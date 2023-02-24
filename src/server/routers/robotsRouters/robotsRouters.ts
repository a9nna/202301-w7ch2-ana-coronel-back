import { Router } from "express";
import {
  createRobot,
  deleteRobotById,
  getRobotById,
  getRobots,
} from "../../controllers/robotsControllers/robotsControllers.js";
import auth from "../../middlewares/auth.js";

export const robotsRouter = Router();

robotsRouter.get("/", getRobots);
robotsRouter.get("/:idRobot", getRobotById);
robotsRouter.delete("/delete/:idRobot", auth, deleteRobotById);
robotsRouter.post("/create/", auth, createRobot);
