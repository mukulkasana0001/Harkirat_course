import logger from './loger.js';

logger.log('Server started successfully');
logger.warn('Disk space running low');
logger.error('Failed to connect to database');





// it is in loggerfile
// const logger = {
//   log: (msg) => {
//     console.log(chalk.blue(`${msg}`));
//   },

//   warn: (msg) => {
//     console.warn(chalk.yellow(` ${msg}`));;
//   },

//   error: (msg) => {
//     console.error(chalk.red(`ℹ️  ${msg}`));
//   }
// };
