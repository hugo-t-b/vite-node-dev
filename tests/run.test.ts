import { describe, expect, it, vi } from "vitest";
import run from "../src/run";

import { AppError } from "../src/error-handler";
import { createServer } from "vite";

vi.mock("vite", () => {
  return {
    createServer() {
      return {
        config: {
          base: "",
          root: ""
        },

        pluginContainer: {
          buildStart: () => void(0)
        }
      };
    }
  };
});

const executeFileSpy = vi.fn();

vi.mock("vite-node/client", () => {
  return {
    ViteNodeRunner: vi.fn(() => {
      return {
        executeFile: executeFileSpy
      };
    })
  };
});

vi.mock("vite-node/server", () => {
  return {
    ViteNodeServer: vi.fn(() => {
      return {
        fetchModule: () => void(0),
        resolveId: () => void(0)
      };
    })
  };
});

describe("Run function", () => {
  it("Throws when the script is not specified", async () => {
    await expect(run).rejects.toBeInstanceOf(AppError);
    await expect(run).rejects.toHaveProperty("quit", true);
  });

  it("Runs the file with vite-node", async () => {
    const server = await createServer();
    const buildStartSpy = vi.spyOn(server.pluginContainer, "buildStart");

    await run(server, "index.js");

    expect(buildStartSpy).toHaveBeenCalledOnce();
    expect(executeFileSpy).toHaveBeenNthCalledWith(1, "index.js");
  });
});
