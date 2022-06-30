export default (callback: (input: string) => void) => {
  process.stdin.on("data", data => {
    const input = data.toString();
    const formattedInput = input.trim();

    callback(formattedInput);
  });
};
