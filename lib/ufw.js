const shell = require('shelljs');
const CLI = require('clui');
const Spinner = CLI.Spinner;
const chalk = require('chalk');

const ufw = (port) => {
  const status = new Spinner('Installing ufw...');
  status.start();
  return new Promise((resolve, reject) => {
    shell.exec([
      'sudo apt-get -qq install ufw',
      'sudo ufw default deny incoming',
      'sudo ufw default allow outgoing'
    ].join(' && '), {
      async: true,
      silent: true
    }, () => {
      
      if (port === '22') {
        shell.exec('sudo ufw allow 22', { silent: true });
      } else {
        shell.exec([
          'sudo ufw allow 22',
          `sudo ufw allow ${port}`
        ].join(' && '), { silent: true });
      }

      shell.exec([
        'sudo ufw allow 22',
        'sudo ufw allow 80',
        'sudo ufw allow 443',
        'echo "Y" | sudo ufw enable'
      ].join(' && '), { silent: true });
  
      status.stop();
      console.log(chalk.green('► ufw Installed.'));
      resolve();
    });
  });
};

module.exports = ufw;