import "../../../loadEnvironment.js";
import { type NextFunction, type Request, type Response } from "express";
import { CustomError } from "../../../CustomError/CustomError.js";
import User from "../../../database/models/User.js";
import { type UserCredentials } from "../../../types";
import jwt from "jsonwebtoken";
import { type AvatarStructure, type UserStructure } from "./types.js";
import bcryptjs from "bcryptjs";

export const loginUser = async (
  req: Request<
    Record<string, unknown>,
    Record<string, unknown>,
    UserCredentials
  >,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username, password }).exec();

  if (!user) {
    const customError = new CustomError(
      "Wrong credentials",
      401,
      "Wrong credentials"
    );

    next(customError);
    return;
  }

  const jwtPayload = {
    sub: user?._id,
  };

  const token = jwt.sign(jwtPayload, process.env.JWT_SECRET!);

  res.status(200).json({ token });
};

export const createUser = async (
  req: Request<Record<string, unknown>, Record<string, unknown>, UserStructure>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password, email } = req.body;

    const { filename } = req.file as AvatarStructure;

    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = await User.create({
      email,
      username,
      password: hashedPassword,
      avatar: filename,
    });

    res.status(201).json({ user });
  } catch (error) {
    const customError = new CustomError(
      (error as Error).message,
      500,
      "Couldn't create the user"
    );

    next(customError);
  }
};
