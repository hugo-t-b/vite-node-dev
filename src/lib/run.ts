import { createServer } from "vite";
import type { ViteDevServer } from "vite";
import { ViteNodeRunner } from "vite-node/client";
import { ViteNodeServer } from "vite-node/server";

import { AppError } from "./error-handler.js";

export const createViteServer = async () => {
  const server = await createServer();
  await server.pluginContainer.buildStart({});

  return server;
};

export const createViteNodeServer = (viteServer: ViteDevServer) => new ViteNodeServer(viteServer);

export const createViteNodeRunner = (viteServer: ViteDevServer, viteNodeServer: ViteNodeServer) => {
  return new ViteNodeRunner({
    base: viteServer.config.base,

    fetchModule(id) {
      return viteNodeServer.fetchModule(id);
    },

    resolveId(id, importer) {
      return viteNodeServer.resolveId(id, importer);
    },

    root: viteServer.config.root
  });
};

export default async (script: string, runner: ViteNodeRunner) => {
  if (!script) {
    throw new AppError("File path not specified", true);
  }

  try {
    await runner.executeFile(script);
  } catch (error) {
    if (typeof error === "string") {
      throw new AppError(error);
    }

    if (error instanceof Error) {
      throw new AppError(error.message);
    }

    throw error;
  }
};
