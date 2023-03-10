import { type Request, type Response } from "express";
import User from "../../../database/models/User";
import { type AvatarStructure, type UserStructure } from "./types";
import { createUser } from "./usersControllers";

afterEach(() => jest.restoreAllMocks());

describe("Given a createUser function", () => {
  describe("When it receives a res object", () => {
    test("Then it should call status with 201", async () => {
      const user: UserStructure = {
        email: "",
        username: "",
        password: "",
      };
      const avatar: AvatarStructure = {
        fieldname: "",
        originalname: "",
        encoding: "",
        mimetype: "",
        destination: "",
        filename: "",
        path: "",
        size: 1,
      };
      const statusCode = 201;
      const req = { body: user, file: avatar } as Partial<Request>;
      const next = () => ({});
      const res = {
        status: jest.fn(),
      } as Partial<Response>;

      User.create = jest.fn();
      await createUser(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(statusCode);
    });

    test("Then it should call json with an object with user propery", async () => {
      const mockUser: UserStructure = {
        email: "",
        username: "",
        password: "",
      };
      const mockAvatar: AvatarStructure = {
        fieldname: "",
        originalname: "",
        encoding: "",
        mimetype: "",
        destination: "",
        filename: "",
        path: "",
        size: 1,
      };
      const user = {
        ...mockUser,
        ...mockAvatar,
      };
      const req = { body: mockUser, file: mockAvatar } as Partial<Request>;
      const next = () => ({});
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnValue(user),
      } as Partial<Response>;

      User.create = jest.fn().mockReturnValue(user);
      await createUser(req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({ user });
    });
  });
});
