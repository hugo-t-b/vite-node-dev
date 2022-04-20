#!/usr/bin/env node

import { createServer } from "vite";

import errorHandler from "./error-handler.js";
import runScript from "./run.js";

const main = async () => {
  let server = await createServer();
  const script = process.argv[2];
  
  const run = async () => {
    try {
      await runScript(server, script);
    } catch(error) {
      errorHandler(error);
    }
  };

  const rerun = async () => {
    server.close();
    server = await createServer();

    server.watcher.on("all", rerun);
    run();
  };

  run();
  server.watcher.on("all", rerun);
};

main();
