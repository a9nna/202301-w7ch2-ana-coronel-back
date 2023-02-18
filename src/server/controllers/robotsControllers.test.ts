/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { type Response, type Request, type NextFunction } from "express";
import { getRobots } from "./robotsControllers.js";

describe("Given a getRobots controller", () => {
  describe("When it receives a response", () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as Partial<Response>;
    const req = {} as Request;
    const next: NextFunction = jest.fn();

    test("Then it should call its status method with 200", async () => {
      const expectedStatusCode = 200;

      await getRobots(req, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call its json method", async () => {
      await getRobots(req, res as Response, next);

      expect(res.json).toHaveBeenCalled();
    });
  });
});
