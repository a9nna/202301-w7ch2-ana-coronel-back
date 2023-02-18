import { type NextFunction, type Request, type Response } from "express";
import { debug } from "../../index.js";
import { CustomError } from "../../CustomError/CustomError";
import chalk from "chalk";

export const notFoundError = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = new CustomError("Path not found", 404, "Endpoint not found");

  next(error);
};

export const generalError = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  debug(chalk.red(error.message));

  res
    .status(error.statusCode || 500)
    .json({ error: error.publicMessage || "Something went wrong" });
};
