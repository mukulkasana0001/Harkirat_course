import chalk from 'chalk'

const logger = {
  log: (msg) => {
    console.log(chalk.blue(`${msg}`));
  },

  warn: (msg) => {
    console.warn(chalk.yellow(` ${msg}`));;
  },

  error: (msg) => {
    console.error(chalk.red(`ℹ️  ${msg}`));
  }
};

export default logger;
