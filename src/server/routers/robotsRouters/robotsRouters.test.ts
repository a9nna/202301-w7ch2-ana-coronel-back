import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../..";
import connectDataBase from "../../../database/connectDataBase";

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
