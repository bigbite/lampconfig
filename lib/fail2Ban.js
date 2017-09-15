const shell = require('shelljs');
const CLI = require('clui');
const Spinner = CLI.Spinner;
const chalk = require('chalk');

const toInsert = port =>`
[ssh]
port=${port}
EOF
`;

const fail2Ban = (port) => {
  const status = new Spinner('Installing Fail2Ban...');
  status.start();
  return new Promise((resolve, reject) => {
    shell.exec('sudo apt-get -qq install fail2ban', {
      async: true,
      silent: true
    }, () => {
      shell.touch('/etc/fail2ban/jail.local');
      shell.exec(`cat >> /etc/fail2ban/jail.local <<EOF ${toInsert(port)}`);
      status.stop();
      console.log(chalk.green('► Fail2Ban Installed.'));
      resolve();
    });
  });
};

module.exports = fail2Ban;