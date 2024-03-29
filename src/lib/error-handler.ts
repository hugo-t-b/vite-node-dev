import { red } from "colorette";

export class AppError extends Error {
  quit: boolean;

  constructor(message: string, quit = false) {
    super(message);
    this.quit = quit;
  }
}

export default (error?: unknown) => {
  let message = "An error occurred";

  if (typeof error === "string") {
    message = error;
  }

  if (error instanceof Error) {
    ({ message } = error);
  }

  const formattedMessage = red(message);
  console.log(formattedMessage);

  if (error instanceof AppError && error.quit) {
    process.exit();
  }
};
