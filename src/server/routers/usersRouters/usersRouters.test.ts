import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import jwt from "jsonwebtoken";
import { app } from "../../index.js";
import connectDataBase from "../../../database/connectDataBase";
import User from "../../../database/models/User.js";
import { type UserStructure } from "../../controllers/usersControllers/types.js";
import { type UserCredentials } from "../../../types.js";
import multer from "multer";

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
  const existentUser: UserStructure = {
    password: "12345678",
    username: "Manoli",
    email: "hello@manioli.com",
  };
  const userCredentials: UserCredentials = {
    password: "12345678",
    username: "Manoli",
  };
  describe("When it receives a request with username 'Manoli' and password '12345678' and user exists", () => {
    beforeAll(async () => {
      await User.create(existentUser);
    });

    test("Then it responds with status 200 and the body of the response has the 'token' property", async () => {
      jwt.sign = jest.fn().mockImplementation(() => ({
        token: "fjeiuahfas",
      }));

      const response = await request(app)
        .post("/users/login")
        .send(userCredentials)
        .expect(200);

      expect(response.body).toHaveProperty("token");
    });
  });

  describe("When it receives a request with username 'Manoli' and password '12345678' and user doesn't exists", () => {
    test("Then it responds with status 401 and '{'error':'Wrong credentials'}'", async () => {
      const response = await request(app)
        .post("/users/login")
        .send(userCredentials)
        .expect(401);

      expect(response.text).toBe('{"error":"Wrong credentials"}');
    });
  });
});

describe("Given the POST '/users/register' endpoint", () => {
  describe("When it receives a request with username 'Manolo' with an avatar image and user doesn't exists", () => {
    test("Then it responds with status 201 and the user with avatar image", async () => {
      User.create = jest.fn();
      jest.mock("../usersRouters/usersRouters", () => {
        multer.diskStorage = jest.fn().mockImplementation();
      });

      await request(app)
        .post("/users/register")
        .set("Content-type", "multipart/form-data")
        .attach("avatar", "uploads/avatar-eng2jwn6llehlvqao-avatarcito.png")
        .field("username", "Manolo")
        .field("email", "loli@lola.com")
        .field("password", "manolo82lola93")
        .expect(201);
    });
  });
});
