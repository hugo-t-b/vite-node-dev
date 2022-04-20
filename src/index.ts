import { createServer } from "vite";

import errorHandler from "./error-handler.js";
import runScript from "./run.js";
import watcherPromise from "./watch.js";

const main = async () => {
  let currentServer = await createServer();
  const watcher = await watcherPromise;
  const script = process.argv[2];

  const run = async () => {
    try {
      await runScript(currentServer, script);
    } catch(error) {
      errorHandler(error);
    }
  };

  run();

  watcher.on("change", async () => {
    await currentServer.close();
    currentServer = await createServer();
  
    run();
  });
};

main();
