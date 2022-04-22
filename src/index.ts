#!/usr/bin/env node

import { createServer } from "vite";

import errorHandler from "./error-handler.js";
import runScript from "./run.js";

const main = async () => {
  let server = await createServer();

  const scriptArgument = 2;
  const script = process.argv[scriptArgument];
  
  const run = async () => {
    try {
      await runScript(server, script);
    } catch (error) {
      errorHandler(error);
    }
  };

  const rerun = async () => {
    const newServer = await createServer();
    
    server.close();
    newServer.watcher.on("all", rerun);
    server = newServer;

    run();
  };

  run();
  server.watcher.on("all", rerun);
};

main();
