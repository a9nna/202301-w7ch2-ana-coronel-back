import { type NextFunction, type Request, type Response } from "express";
import { CustomError } from "../../../CustomError/CustomError.js";
import { Robot } from "../../../database/models/Robot.js";
import { type CustomRequest, type RobotStructure } from "../../../types";

export const getRobots = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const robots = await Robot.find().exec();

    res.status(200).json({ robots });
  } catch (error) {
    const customError = new CustomError(
      error.message,
      500,
      "Couldn't retrieve robots."
    );

    next(customError);
  }
};

export const getRobotById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { idRobot } = req.params;

  try {
    const robot = await Robot.findById(idRobot).exec();

    res.status(200).json({ robot });
  } catch (error) {
    const customError = new CustomError(
      error.message,
      500,
      "Couldn't retrieve robot."
    );

    next(customError);
  }
};

export const deleteRobotById = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { idRobot } = req.params;

  try {
    await Robot.findByIdAndDelete({ _id: idRobot, owner: req.ownerId }).exec();

    res.status(200).json({ idRobot });
  } catch (error) {
    const customError = new CustomError(
      error.message,
      500,
      "Couldn't find and delete the robot"
    );

    next(customError);
  }
};

export const createRobot = async (
  req: Request<
    Record<string, unknown>,
    Record<string, unknown>,
    RobotStructure
  >,
  res: Response,
  next: NextFunction
) => {
  try {
    const newRobot = req.body;

    await Robot.create({ newRobot });

    res.status(201).json({ newRobot });
  } catch (error) {
    const customError = new CustomError(
      error.message,
      500,
      "Couldn't create the robot"
    );

    next(customError);
  }
};
