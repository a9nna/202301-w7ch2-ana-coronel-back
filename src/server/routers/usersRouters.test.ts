import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "..";
import connectDataBase from "../../database/connectDataBase";
import request from "supertest";
import User from "../../database/models/User";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectDataBase(server.getUri());
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.stop();
});

afterEach(async () => {
  await User.deleteMany();
});

describe("Given the POST '/users/login' endpoint", () => {
  const mockUser = {
    username: "Manoli",
    password: "12345678",
    email: "manoli@manoli.com",
  };

  describe("When it receives a request with username 'Manoli' and password '12345678' and user exists", () => {
    beforeAll(async () => {
      await User.create(mockUser);
    });

    test("Then it responds with status 200 and the body of the response has the 'token' property", async () => {
      const response = await request(app)
        .post("/users/login")
        .send(mockUser)
        .expect(200);

      expect(response.body).toHaveProperty("token");
    });
  });

  describe("When it receives a request with username 'Manoli' and password '12345678' and user doesn't exists", () => {
    test("Then it responds with status 401 and '{'error':'Wrong credentials'}'", async () => {
      const response = await request(app)
        .post("/users/login")
        .send(mockUser)
        .expect(401);

      expect(response.text).toBe('{"error":"Wrong credentials"}');
    });
  });
});
