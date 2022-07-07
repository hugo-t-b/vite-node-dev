import { afterEach, describe, expect, it, vi } from "vitest";
import run, { createViteNodeRunner, createViteNodeServer, createViteServer } from "../src/lib/run";

import * as viteExports from "vite";
import * as viteNodeRunnerExports from "vite-node/client";
import type { ViteNodeRunnerOptions } from "vite-node";
import * as viteNodeServerExports from "vite-node/server";

const executeFileSpy = vi.fn(() => new Promise(() => {}));

const viteServerBuildStartSpy = vi.fn(() => {
  return new Promise<void>(resolve => {
    resolve();
  });
});

vi.mock("vite", () => {
  return {
    createServer() {
      return new Promise(resolve => {
        resolve({
          config: {
            base: "/",
            root: "/"
          },

          pluginContainer: {
            buildStart: viteServerBuildStartSpy
          }
        });
      });
    }
  };
});

vi.mock("vite-node/server", () => {
  return {
    ViteNodeServer: vi.fn(() => {
      return {
        fetchModule: () => new Promise<void>(resolveFetchModule => {
          resolveFetchModule();
        }),

        resolveId: () => new Promise(resolve => {
          resolve(null);
        })
      };
    })
  };
});

vi.mock("vite-node/client", () => {
  return {
    ViteNodeRunner: vi.fn(() => {
      return {
        executeFile: executeFileSpy
      };
    })
  };
});

describe("Run function", () => {
  it("Runs the file with vite-node", () => {
    const viteNodeRunnerOptions: ViteNodeRunnerOptions = {
      fetchModule: () => new Promise(() => {}),
      root: ""
    };

    run("index.js", new viteNodeRunnerExports.ViteNodeRunner(viteNodeRunnerOptions));

    expect(executeFileSpy).toHaveBeenCalledOnce();
    expect(executeFileSpy).toHaveBeenCalledWith("index.js");
  });
});

describe("Create vite server function", () => {
  const createServerSpy = vi.spyOn(viteExports, "createServer");

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("Returns a vite server", async () => {
    const returnValue = await createViteServer();

    expect(returnValue).toMatchObject({
      config: {
        base: expect.any(String) as object,
        root: expect.any(String) as object
      },

      pluginContainer: {
        buildStart: expect.any(Function) as object
      }
    });
  });

  it("Creates a new vite server", async () => {
    await createViteServer();
    expect(createServerSpy).toHaveBeenCalledOnce();
  });

  it("Initializes vite plugins", async () => {
    await createViteServer();
    expect(viteServerBuildStartSpy).toHaveBeenCalledOnce();
  });
});

describe("Create vite-node server function", () => {
  const createViteNodeServerSpy = vi.spyOn(viteNodeServerExports, "ViteNodeServer");

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("Returns a vite-node server", async () => {
    const viteServer = await viteExports.createServer();
    const result = createViteNodeServer(viteServer);

    expect(result).toMatchObject({
      fetchModule: expect.any(Function) as object,
      resolveId: expect.any(Function) as object
    });
  });

  it("Creates a new vite-node server by passing a vite server", async () => {
    const viteServer = await viteExports.createServer();
    createViteNodeServer(viteServer);

    expect(createViteNodeServerSpy).toHaveBeenCalledOnce();
    expect(createViteNodeServerSpy).toHaveBeenCalledWith(viteServer);
  });
});

describe("Create vite-node runner function", () => {
  const createViteNodeRunnerSpy = vi.spyOn(viteNodeRunnerExports, "ViteNodeRunner");

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("Returns a vite-node runner", async () => {
    const viteServer = await viteExports.createServer();
    const viteNodeServer = new viteNodeServerExports.ViteNodeServer(viteServer);
    const result = createViteNodeRunner(viteServer, viteNodeServer);

    expect(result).toMatchObject({
      executeFile: expect.any(Function) as object
    });
  });

  it("Creates a new vite-node runner by passing the required arguments", async () => {
    const expectedArguments = expect.objectContaining({
      base: expect.stringContaining("/") as object,
      fetchModule: expect.any(Function) as object,
      resolveId: expect.any(Function) as object,
      root: expect.stringContaining("/") as object
    }) as object;

    const viteServer = await viteExports.createServer();
    const viteNodeServer = new viteNodeServerExports.ViteNodeServer(viteServer);

    createViteNodeRunner(viteServer, viteNodeServer);

    expect(createViteNodeRunnerSpy).toHaveBeenCalledOnce();
    expect(createViteNodeRunnerSpy).toHaveBeenCalledWith(expectedArguments);
  });
});
