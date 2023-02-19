import "./loadEnvironment.js";
import createDebug from "debug";
import startServer from "./server/startServer.js";
import connectDataBase from "./database/connectDataBase.js";
import mongoose from "mongoose";

export const debug = createDebug("robots:*");

const port = process.env.PORT ?? 4000;
const mongoDdUrl = process.env.MONGODB_CONNECTION_URL;

mongoose.set("toJSON", {
  virtuals: true,
  transform(doc, ret) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newDocument = { ...ret };

    delete newDocument._id;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return newDocument;
  },
});

try {
  await connectDataBase(mongoDdUrl!);
  debug("Connected to data base");

  await startServer(+port);
  debug(`Server listening on port ${port}`);
} catch (error) {
  debug(error.message);
}
