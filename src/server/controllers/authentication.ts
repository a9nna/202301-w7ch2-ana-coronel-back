import { type NextFunction, type Request, type Response } from "express";
import { CustomError } from "../../CustomError/CustomError.js";

export const authentication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.query;

  if (!token || token !== "victor37marc4") {
    const error = new CustomError("Invalid token", 401, "Invalid token");

    next(error);

    return;
  }

  next();
};
