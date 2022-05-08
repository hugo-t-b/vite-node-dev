import { afterEach, describe, expect, it, vi } from "vitest";

import errorHandler, { AppError } from "../src/error-handler";

describe("Error handler function", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("Logs the message to the console", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => undefined);

    errorHandler();
    errorHandler("");
    errorHandler(1);
    errorHandler(true);
    errorHandler([]);
    errorHandler(new Error());
    errorHandler(null);

    expect(spy).toHaveBeenCalledTimes(7);
  });

  it("Exits the process when requested", () => {
    vi.spyOn(console, "log").mockImplementation(() => undefined);
    const spy = vi.spyOn(process, "exit").mockImplementation(() => undefined);

    errorHandler();
    expect(spy).not.toHaveBeenCalled();

    errorHandler(1);
    expect(spy).not.toHaveBeenCalled();

    errorHandler("");
    expect(spy).not.toHaveBeenCalled();

    errorHandler(new Error(""));
    expect(spy).not.toHaveBeenCalled();

    errorHandler(new AppError(""));
    expect(spy).not.toHaveBeenCalled();

    errorHandler({ quit: true });
    expect(spy).not.toHaveBeenCalled();

    errorHandler(new AppError("", true));
    expect(spy).toHaveBeenCalledOnce();
  });
});

describe("AppError class", () => {
  it("Is an instance of Error", () => {
    const instance = new AppError("");

    expect(instance).toBeInstanceOf(Error);
    expect(instance.message).toBeTypeOf("string");
  });

  it("Message property is set to the message", () => {
    const { message } = new AppError("");
    expect(message).toBe("");
  });

  it("Quit property is set correctly", () => {
    const { quit: quitDefault } = new AppError("");
    const { quit: quitWhenFalsePassed } = new AppError("", false);
    const { quit: quitWhenTruePassed } = new AppError("", true);

    expect(quitDefault).toBe(false);
    expect(quitWhenFalsePassed).toBe(false);
    expect(quitWhenTruePassed).toBe(true);
  });
});
