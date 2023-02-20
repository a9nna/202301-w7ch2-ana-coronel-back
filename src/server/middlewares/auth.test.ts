import { type NextFunction, type Response } from "express";
import { CustomError } from "../../CustomError/CustomError";
import { type CustomRequest } from "../../types";
import auth from "./auth";

const next = jest.fn() as NextFunction;
const res = {} as Response;

describe("Given an auth middleware", () => {
  describe("When called with a req, res and next", () => {
    test("Then it should call the next method without an error", async () => {
      const req = {
        header: jest.fn().mockReturnValue("Bearer 1234"),
      } as Partial<CustomRequest>;

      const customError = new CustomError(
        "Missing authorization header",
        401,
        "Missing token"
      );

      await auth(req as CustomRequest, res, next);

      expect(next).toHaveBeenCalled();
      expect(next).not.toHaveBeenCalledWith(customError);
    });
  });

  describe("When it receives a request without an authorization header", () => {
    test("Then it should call its next method with a 401 status error and a message `Missing authorization header`", async () => {
      const expectedStatusCode = 401;
      const customError = new CustomError(
        "Missing authorization header",
        expectedStatusCode,
        "Missing token"
      );
      const req = {
        header: jest.fn().mockReturnValueOnce(undefined),
      } as Partial<CustomRequest>;

      await auth(req as CustomRequest, res, next);

      expect(next).toHaveBeenCalledWith(customError);
    });
  });
});
