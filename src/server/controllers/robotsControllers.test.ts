/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { type Response, type Request, type NextFunction } from "express";
import { Robot } from "../../database/models/Robot.js";
import { getRobotById, getRobots } from "./robotsControllers.js";

beforeEach(() => jest.restoreAllMocks());

describe("Given a getRobots controller", () => {
  describe("When it receives a response", () => {
    test("Then it should call its status method with 200", async () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue({}),
      } as Partial<Response>;
      const req = {} as Request;
      const next = jest.fn();
      const expectedStatusCode = 200;

      Robot.find = jest.fn().mockReturnValue({});

      await getRobots(req, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call its json method", async () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue({}),
      } as Partial<Response>;
      const req = {} as Request;
      const next = jest.fn();
      Robot.find = jest.fn().mockReturnValue({});

      await getRobots(req, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({ robots: {} });
    });

    test("Then it should call its status method with 200", async () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue({}),
      } as Partial<Response>;
      const req = {} as Request;
      const next = jest.fn();
      const expectedStatusCode = 200;

      Robot.findById = jest.fn().mockReturnValue({});

      await getRobotById(req, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call its json method", async () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue({}),
      } as Partial<Response>;
      const req = {} as Request;
      const next = jest.fn();

      Robot.findById = jest.fn().mockReturnValue({});

      await getRobotById(req, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({ robot: {} });
    });
  });
});
