import jwt from "jsonwebtoken";
import { type NextFunction, type Response } from "express";
import { CustomError } from "../../CustomError/CustomError.js";
import { type CustomJwtPayload, type CustomRequest } from "../../types";

const auth = async (req: CustomRequest, res: Response, next: NextFunction) => {
  if (!req.header("Authorization")) {
    const customError = new CustomError(
      "Missing authorization header",
      401,
      "Missing token"
    );

    next(customError);

    return;
  }

  if (!req.header("Authorization")?.replace(/Bearer\s*/, "")) {
    const customError = new CustomError(
      "Missing authorization header",
      401,
      "Missing token"
    );

    next(customError);

    return;
  }

  const token = req.header("Authorization")?.replace(/Bearer\s*/, "");

  try {
    const { sub: ownerId } = jwt.verify(
      token!,
      process.env.JWT_SECRET!
    ) as CustomJwtPayload;

    req.ownerId = ownerId;
  } catch (error) {
    next(error);
  }

  next();
};

export default auth;
