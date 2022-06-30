import type { CLIOptions } from "./types.js";
import errorHandler from "./error-handler.js";
import listenForInput from "./input.js";
import runScript, { createViteNodeRunner, createViteNodeServer, createViteServer } from "./run.js";

export default async (script: string, options: CLIOptions) => {
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
