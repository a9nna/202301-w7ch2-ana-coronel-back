import { type Response, type Request } from "express";
import { Robot } from "../../../database/models/Robot.js";
import {
  type RobotStructure,
  type RobotsStructure,
  type CustomRequest,
} from "../../../types.js";
import {
  createRobot,
  deleteRobotById,
  getRobotById,
  getRobots,
} from "./robotsControllers.js";

const mockTerminatorRobot: RobotStructure = {
  name: "Terminator",
  url: "",
  id: 11,
  stats: {
    speed: 1,
    endurance: 1,
    creationDate: new Date(),
  },
};

const mockRobotsList: RobotsStructure = [
  mockTerminatorRobot,
  {
    name: "C3PO",
    url: "",
    id: 22,
    stats: {
      speed: 1,
      endurance: 1,
      creationDate: new Date(),
    },
  },
];

beforeEach(() => jest.restoreAllMocks());

describe("Given a getRobots controller", () => {
  describe("When it receives a response", () => {
    test("Then it should call its status method with 200", async () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue(mockRobotsList),
      } as Partial<Response>;
      const req = {} as Request;
      const next = jest.fn();
      const expectedStatusCode = 200;

      Robot.find = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockReturnValue(mockRobotsList),
      }));

      await getRobots(req, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call its json method", async () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue(mockRobotsList),
      } as Partial<Response>;
      const req = {} as Request;
      const next = jest.fn();
      Robot.find = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockReturnValue(mockRobotsList),
      }));

      await getRobots(req, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({ robots: mockRobotsList });
    });
  });
});

describe("Given a getRobotById controller", () => {
  describe("When it receives a response", () => {
    test("Then it should call its status method with 200", async () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue(mockRobotsList),
      } as Partial<Response>;
      const req: Partial<Request> = {
        params: { id: `${mockTerminatorRobot.id}` },
      };
      const next = jest.fn();
      const expectedStatusCode = 200;

      Robot.findById = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockReturnValue(mockRobotsList),
      }));

      await getRobotById(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call its json method", async () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue(mockTerminatorRobot),
      } as Partial<Response>;
      const req: Partial<Request> = {
        params: { id: `${mockTerminatorRobot.id}` },
      };
      const next = jest.fn();

      Robot.findById = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockReturnValue(mockTerminatorRobot),
      }));

      await getRobotById(req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({ robot: mockTerminatorRobot });
    });
  });
});

describe("Given a deleteRobotById controller", () => {
  describe("When it receives a response", () => {
    test("Then it should call its status method with 200", async () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue(mockTerminatorRobot.id),
      } as Partial<Response>;
      const req: Partial<CustomRequest> = {
        params: { id: `${mockTerminatorRobot.id}` },
      };
      const next = jest.fn();
      const expectedStatusCode = 200;

      Robot.findByIdAndDelete = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockReturnValue(mockTerminatorRobot.id),
      }));

      await deleteRobotById(req as CustomRequest, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call its json method", async () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue(mockTerminatorRobot.id),
      } as Partial<Response>;
      const req: Partial<CustomRequest> = {
        params: { idRobot: `${mockTerminatorRobot.id}` },
      };
      const next = jest.fn();

      Robot.findByIdAndDelete = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockReturnValue(mockTerminatorRobot.id),
      }));

      await deleteRobotById(req as CustomRequest, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({
        idRobot: `${mockTerminatorRobot.id}`,
      });
    });
  });
});

describe("Given a createRobot controller", () => {
  describe("When it receives a response", () => {
    test("Then it should call its status method 201", async () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue(mockTerminatorRobot),
      } as Partial<Response>;

      const req = {} as Request;
      const next = jest.fn();
      const expectedStatus = 201;

      Robot.create = jest.fn().mockReturnValue(mockTerminatorRobot);

      await createRobot(req, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call its json method", async () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue(mockTerminatorRobot),
      } as Partial<Response>;

      const req = {} as Request;
      const next = jest.fn();

      Robot.create = jest.fn().mockReturnValue(mockTerminatorRobot);

      await createRobot(req, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({});
    });
  });
});
