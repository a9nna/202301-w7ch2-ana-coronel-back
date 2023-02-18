/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { type NextFunction, type Request, type Response } from "express";
import { CustomError } from "../../CustomError/CustomError.js";

export const getRobots = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).json({ pong: true });
  } catch (error) {
    const customError = new CustomError(
      error.message,
      500,
      "Couldn't retrieve robots"
    );

    next(customError);
  }
};
