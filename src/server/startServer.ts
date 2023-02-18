import createDebug from "debug";
import { app } from "./index.js";

const debug = createDebug("robots:server:startServer");

const startServer = async (port: number) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      resolve(server);
    });

    server.on("error", (error: Error) => {
      debug("error");

      reject(new Error("There has been an error"));
    });
  });

export default startServer;
