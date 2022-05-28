#!/usr/bin/env node

import errorHandler from "./error-handler.js";
import listenForInput from "./input.js";
import runScript, { createViteNodeRunner, createViteNodeServer, createViteServer } from "./run.js";

const main = async () => {
  const viteServer = await createViteServer();
  const viteNodeServer = createViteNodeServer(viteServer);
  let viteNodeRunner = createViteNodeRunner(viteServer, viteNodeServer);

  const scriptArgument = 2;
  const script = process.argv[scriptArgument];

  const run = () => {
    try {
      runScript(script, viteNodeRunner);
    } catch (error) {
      errorHandler(error);
    }
  };

  const rerun = () => {
    console.clear();
    viteNodeRunner = createViteNodeRunner(viteServer, viteNodeServer);
    run();
  };

  run();
  viteServer.watcher.on("all", rerun);

  listenForInput(input => {
    if (input === "rs") {
      rerun();
    }
  });
};

main().catch(errorHandler);
