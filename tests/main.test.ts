import { afterEach, describe, expect, it, vi } from "vitest";
import main from "../src/lib/main";

import * as inputExports from "../src/lib/input";
import * as runExports from "../src/lib/run";
import { ViteNodeRunner } from "vite-node/client";

const viteServerWatcherOnSpy = vi.fn<[string, () => void]>();

vi.mock("../src/lib/input", () => {
  return {
    default: () => undefined
  };
});

vi.mock("../src/lib/run", () => {
  return {
    createViteNodeRunner() {
      return new ViteNodeRunner({
        fetchModule: () => new Promise(() => {}),
        root: ""
      });
    },

    createViteNodeServer() {
      return {};
    },

    createViteServer() {
      return {
        watcher: {
          on: viteServerWatcherOnSpy
        }
      };
    },

    default() {
      return new Promise<void>(resolve => {
        resolve();
      });
    }
  };
});

describe("Main function", () => {
  const consoleClearSpy = vi
    .spyOn(console, "clear")
    .mockImplementation(() => undefined);

  const processExitSpy = vi.spyOn(process, "exit")
    .mockImplementation((() => {}) as () => never);

  const runSpy = vi.spyOn(runExports, "default");

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("Runs the 'run' function with the correct arguments", async () => {
    await main("index.js", {});

    expect(runSpy).toHaveBeenCalledOnce();
    expect(runSpy).toHaveBeenCalledWith("index.js", expect.any(ViteNodeRunner));
  });

  it("Exits the process after one run if the --run flag is passed", async () => {
    await main("index.js", {
      run: true
    });

    expect(processExitSpy).toHaveBeenCalledOnce();
  });

  it("Restarts the script on an event from the vite file watcher", async () => {
    viteServerWatcherOnSpy.mockImplementationOnce((_, callback) => {
      setTimeout(callback, 50);
    });

    await main("index.js", {});
    runSpy.mockClear();

    await new Promise(resolve => {
      setTimeout(resolve, 50);
    });

    expect(viteServerWatcherOnSpy).toHaveBeenCalledOnce();
    expect(viteServerWatcherOnSpy).toHaveBeenCalledWith("all", expect.any(Function));

    expect(runSpy).toHaveBeenCalledOnce();
  });

  it("Restarts the script when 'rs' is entered", async () => {
    const inputSpy = vi.spyOn(inputExports, "default");

    inputSpy.mockImplementationOnce(callback => {
      setTimeout(() => callback("rs"), 50);
    });

    await main("index.js", {});
    runSpy.mockClear();

    await new Promise(resolve => {
      setTimeout(resolve, 50);
    });

    expect(runSpy).toHaveBeenCalledOnce();
  });

  it("Clears the console when restarting a script", async () => {
    viteServerWatcherOnSpy.mockImplementationOnce((_, callback) => {
      setTimeout(callback, 50);
    });

    await main("index.js", {});

    await new Promise(resolve => {
      setTimeout(resolve, 50);
    });

    expect(consoleClearSpy).toHaveBeenCalledOnce();
  });
});
