import { describe, expect, it, vi } from "vitest";
import run from "../src/lib/run";

import { ViteNodeRunner } from "vite-node/client";
import type { ViteNodeRunnerOptions } from "vite-node";

const executeFileSpy = vi.fn(() => new Promise(() => {}));

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

    run("index.js", new ViteNodeRunner(viteNodeRunnerOptions));
    expect(executeFileSpy).toHaveBeenNthCalledWith(1, "index.js");
  });
});
