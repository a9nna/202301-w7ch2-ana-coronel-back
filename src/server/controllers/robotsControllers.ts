import { type NextFunction, type Request, type Response } from "express";
import { CustomError } from "../../CustomError/CustomError.js";
import { Robot } from "../../database/models/Robot.js";

export const getRobots = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const robots = await Robot.find();

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
    const robot = await Robot.findById(idRobot);

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
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { idRobot } = req.params;

  try {
    await Robot.findByIdAndDelete({ _id: idRobot });

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
