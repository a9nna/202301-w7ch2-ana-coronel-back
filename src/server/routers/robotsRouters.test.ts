import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import { app } from "..";
import connectDataBase from "../../database/connectDataBase";
import mongoose from "mongoose";

let mongodbServer: MongoMemoryServer;

beforeAll(async () => {
  mongodbServer = await MongoMemoryServer.create();

  await connectDataBase(mongodbServer.getUri());
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongodbServer.stop();
});

describe("Given a robots endpoint", () => {
  describe("When it receives a request to /robots with the get method", () => {
    test("Then it should response a 200 code status", async () => {
      await request(app).get("/robots").expect(200);
    });
  });
});
