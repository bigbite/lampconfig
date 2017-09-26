const CLI = require('clui');
const Spinner = CLI.Spinner;
const shell = require('shelljs');
const chalk = require('chalk');

const runCommand = (options) => {
  const status = new Spinner(options.loader);
  status.start();
  return new Promise((resolve, reject) => {
    shell.exec(options.cmd, {
      async: true,
      silent: true
    }, () => {
      status.stop();
      console.log(chalk.green(`► ${options.success}`));
      resolve();
    });
  });
};

module.exports = runCommand;
