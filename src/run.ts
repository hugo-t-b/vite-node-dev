import { ViteDevServer } from "vite";
import { ViteNodeRunner } from "vite-node/client";
import { ViteNodeServer } from "vite-node/server";

import { AppError } from "./error-handler.js";

export default async (viteServer: ViteDevServer, script: string) => {
  if (!script) throw new AppError("File path not specified", true);

  await viteServer.pluginContainer.buildStart({});

  const nodeServer = new ViteNodeServer(viteServer);

  const runner = new ViteNodeRunner({
    root: viteServer.config.root,
    base: viteServer.config.base,
  
    fetchModule(id) {
      return nodeServer.fetchModule(id);
    },

    resolveId(id, importer) {
      return nodeServer.resolveId(id, importer);
    }
  });

  await runner.executeFile(script);
};
