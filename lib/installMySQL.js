const getPassword = require('./getPassword');
const CLI = require('clui');
const Spinner = CLI.Spinner;
const shell = require('shelljs');
const chalk = require('chalk');

const installMySQL = (options) => {
  return new Promise((resolve, reject) => {
    return getPassword(options.passwordPrompt, (password) => {
      const status = new Spinner(options.loader);
      shell.exec([
        `sudo debconf-set-selections <<< "mysql-server mysql-server/root_password password ${password}"`,
        `sudo debconf-set-selections <<< "mysql-server mysql-server/root_password_again password ${password}"`,
        'sudo apt-get install -qq mysql-server-5.7'
      ].join(' && '), { 
        async: true, 
        silent: true 
      }, () => {
        status.stop();
        console.log(chalk.green(`► ${options.success}`));
        resolve();
      });
    });
  });
};

module.exports = installMySQL;
