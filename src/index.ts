import { createServer } from "vite";
import { ViteNodeServer } from "vite-node/server";
import { ViteNodeRunner } from "vite-node/client";

const file = process.argv[2];

const main = async () => {
  if (!file) {
    console.error("File path not specified");
    return;
  }

  const viteServer = await createServer();
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

  await runner.executeFile(file);
  await viteServer.close();
};

main();
