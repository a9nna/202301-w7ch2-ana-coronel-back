import "./loadEnvironment.js";
import createDebug from "debug";
import startServer from "./server/startServer.js";

export const debug = createDebug("robots:*");

const port = process.env.PORT ?? 4000;

try {
  await startServer(+port);
  debug(`Server listening on port ${port}`);
} catch (error) {
  debug(error.message);
}
