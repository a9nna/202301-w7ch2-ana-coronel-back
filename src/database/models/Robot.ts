import { model, Schema } from "mongoose";

export const robotSchema = new Schema({
  name: String,
  url: String,
  stats: {
    speed: Number,
    endurance: Number,
    creationDate: Date,
  },
});

export const Robot = model("Robot", robotSchema, "robots");
