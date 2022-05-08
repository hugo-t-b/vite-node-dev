import { afterEach, describe, expect, it, vi } from "vitest";
import inputListener from "../src/input";

describe("Input listener", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("Calls the callback function when data is entered", () => {
    const spy = vi.fn();

    inputListener(spy);
    process.stdin.emit("data", Buffer.from(""));

    expect(spy).toHaveBeenCalledOnce();
  });

  it("Calls the callback function with the correct input", () => {
    const spy = vi.fn();

    inputListener(spy);
    process.stdin.emit("data", Buffer.from("."));

    expect(spy).toHaveBeenNthCalledWith(1, ".");
  });

  it("Trims the input", () => {
    const spy = vi.fn();

    inputListener(spy);

    process.stdin.emit("data", Buffer.from("  . "));
    expect(spy).toHaveBeenNthCalledWith(1, ".");
    spy.mockClear();

    process.stdin.emit("data", Buffer.from("\n .\n"));
    expect(spy).toHaveBeenNthCalledWith(1, ".");
    spy.mockClear();

    process.stdin.emit("data", Buffer.from("\r .\r"));
    expect(spy).toHaveBeenNthCalledWith(1, ".");
    spy.mockClear();

    process.stdin.emit("data", Buffer.from("\r\n .\r\n"));
    expect(spy).toHaveBeenNthCalledWith(1, ".");
    spy.mockClear();
  });
});
