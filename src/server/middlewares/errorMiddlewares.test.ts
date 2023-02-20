import { type NextFunction, type Request, type Response } from "express";
import { CustomError } from "../../CustomError/CustomError.js";
import { generalError, notFoundError } from "./errorMiddlewares.js";

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
} as Partial<Response>;
const req = {} as Request;
const next = jest.fn() as NextFunction;

describe("Given a notFoundError middleware", () => {
  describe("When it receives a response", () => {
    test("Then it should call its next method", async () => {
      notFoundError(req, res as Response, next);
      expect(next).toHaveBeenCalled();
    });
  });
});

describe("Given a generalError middleware", () => {
  describe("When it receives a response and an error with status 500", () => {
    test("Then it should call its status method with 500", () => {
      const statusCode = 500;
      const error = new CustomError(
        "There was an error",
        statusCode,
        "There has been an error"
      );
      generalError(error, req, res as Response, next);
      expect(res.status).toHaveBeenCalledWith(statusCode);
    });
  });
});
