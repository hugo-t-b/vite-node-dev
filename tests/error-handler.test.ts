import { afterEach, describe, expect, it, vi } from "vitest";
import errorHandler, { AppError } from "../src/lib/error-handler";

describe("Error handler function", () => {
  const consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);

  afterEach(() => {
    consoleLogSpy.mockClear();
  });

  it("Logs the message to the console", () => {
    errorHandler();
    errorHandler("");
    errorHandler(1);
    errorHandler(true);
    errorHandler([]);
    errorHandler(new Error());
    errorHandler(null);

    expect(consoleLogSpy).toHaveBeenCalledTimes(7);
  });

  it("Exits the process when requested", () => {
    const processExitSpy = vi.spyOn(process, "exit").mockImplementation(() => new Promise<never>(() => {}));

    errorHandler();
    errorHandler(1);
    errorHandler("");
    errorHandler(new Error(""));
    errorHandler(new AppError(""));
    errorHandler({ quit: true });
    errorHandler(new AppError("", true));

    expect(processExitSpy).toHaveBeenCalledOnce();
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
