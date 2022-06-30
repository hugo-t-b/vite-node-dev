#!/usr/bin/env node

import { program } from "commander";

import errorHandler from "./error-handler.js";
import listenForInput from "./input.js";
import runScript, { createViteNodeRunner, createViteNodeServer, createViteServer } from "./run.js";

const main = async (script: string) => {
  const viteServer = await createViteServer();
  const viteNodeServer = createViteNodeServer(viteServer);
  let viteNodeRunner = createViteNodeRunner(viteServer, viteNodeServer);

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

program.name("vite-node-dev");

program
  .argument("<file>")
  .action(main);

program.parse();
