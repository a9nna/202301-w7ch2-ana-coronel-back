/* eslint-disable @typescript-eslint/no-unsafe-argument */
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
      "Couldn't retrieve robots"
    );

    next(customError);
  }
};
