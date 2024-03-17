import chalk from "chalk";
export const LogChalk = {
  error: (text: string) => {
    console.log(
      chalk.red.bold("> ") +
        chalk.white.bgRed.bold(" ERROR ") +
        " " +
        chalk.red.bold(text),
    );
  },
  warning: (text: string) => {
    console.log(
      chalk.yellow.bold("> ") +
        chalk.white.bgYellow.bold(" WARN ") +
        " " +
        chalk.yellow.bold(text),
    );
  },
  info: (text: string) => {
    console.log(
      chalk.blue.bold("> ") +
        chalk.white.bgBlue.bold(" INFO ") +
        " " +
        chalk.blue.bold(text),
    );
  },
};
