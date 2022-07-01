import inputListener from "../src/lib/input";
import { afterEach, describe, expect, it, vi } from "vitest";

describe("Input listener", () => {
  const callbackSpy = vi.fn();

  afterEach(() => {
    callbackSpy.mockClear();
  });

  it("Calls the callback function with the correct input", () => {
    inputListener(callbackSpy);
    process.stdin.emit("data", Buffer.from("."));

    expect(callbackSpy).toHaveBeenCalledOnce();
    expect(callbackSpy).toHaveBeenCalledWith(".");
  });

  it("Trims the input", () => {
    inputListener(callbackSpy);

    process.stdin.emit("data", Buffer.from("  . "));
    process.stdin.emit("data", Buffer.from("\n .\n"));
    process.stdin.emit("data", Buffer.from("\r .\r"));
    process.stdin.emit("data", Buffer.from("\r\n .\r\n"));

    expect(callbackSpy).toHaveBeenNthCalledWith(1, ".");
    expect(callbackSpy).toHaveBeenNthCalledWith(3, ".");
    expect(callbackSpy).toHaveBeenNthCalledWith(2, ".");
    expect(callbackSpy).toHaveBeenNthCalledWith(4, ".");
  });
});
