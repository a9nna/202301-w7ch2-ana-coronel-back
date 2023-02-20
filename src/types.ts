import { type Request } from "express";
import { type JwtPayload } from "jsonwebtoken";
export interface RobotStructure {
  name: string;
  url: string;
  id: number;
  stats: {
    speed: number;
    endurance: number;
    creationDate: Date;
  };
}

export interface UserCredentials {
  username: string;
  password: string;
}

export type RobotsStructure = RobotStructure[];

export interface CustomRequest extends Request {
  ownerId: string;
}

export interface CustomJwtPayload extends JwtPayload {
  sub: string;
}
