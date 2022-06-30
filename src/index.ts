#!/usr/bin/env node

import { program } from "commander";

import type { CLIOptions } from "./lib/types.js";
import errorHandler from "./lib/error-handler.js";
import listenForInput from "./lib/input.js";
import runScript, { createViteNodeRunner, createViteNodeServer, createViteServer } from "./lib/run.js";

const main = async (script: string, options: CLIOptions) => {
  const viteServer = await createViteServer();
  const viteNodeServer = createViteNodeServer(viteServer);
  let viteNodeRunner = createViteNodeRunner(viteServer, viteNodeServer);

  const run = async () => {
    try {
      await runScript(script, viteNodeRunner);
    } catch (error) {
      errorHandler(error);
    }
  };

  if (options.run) {
    await run();
    process.exit();
  }

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

program
  .name("vite-node-dev")
  .version("0.2.1");

program
  .argument("<file>")
  .option("-r, --run", "run a file without reloading")
  .action(main);

program.parse();
