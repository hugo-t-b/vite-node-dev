import { createServer } from "vite";

import run from "./run.js";
import watcherPromise from "./watch.js";

const main = async () => {
  let currentServer = await createServer();
  const watcher = await watcherPromise;

  const script = process.argv[2];
  run(currentServer, script);

  watcher.on("change", async () => {
    await currentServer.close();
    currentServer = await createServer();
  
    run(currentServer, script)
  });
};

main();
