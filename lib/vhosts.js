const shell = require('shelljs');
const chalk = require('chalk');

const vhost = (site, rootDir, domain, alias, logDir = '/var/log/apache2') =>`
<VirtualHost *:80>
  ServerAdmin webmaster@localhost
  ServerName ${domain}
  ServerAlias ${alias}
  DocumentRoot /var/www/${site}${rootDir}
  <Directory /var/www/${site}${rootDir}>
      Options -Indexes +FollowSymLinks +MultiViews
      AllowOverride All
      Require all granted
      <FilesMatch \.php$>
          # Change this "proxy:unix:/path/to/fpm.socket"
          # if using a Unix socket
          SetHandler "proxy:fcgi://127.0.0.1:9000"
      </FilesMatch>
  </Directory>
  ErrorLog ${logDir}/${site}-error.log
  # Possible values include: debug, info, notice, warn, error, crit,
  # alert, emerg.
  LogLevel warn
  CustomLog ${logDir}/${site}-access.log combined
</VirtualHost>
EOF
`;

module.exports = ({site, rootDir, domain, alias}) => {
  return new Promise((res, rej) => {
    shell.cd('/etc/apache2/sites-available/');
    shell.touch(`${site}.conf`);
    shell.exec(`cat >> /etc/apache2/sites-available/${site}.conf <<EOF ${vhost(site, rootDir, domain, alias)}`);
    shell.exec([
      `a2ensite ${site}.conf`,
      'service apache2 reload'
    ].join(' && '), { async: true, silent: true }, () => {
      console.log(chalk.green('► Set Up vhosts.'));
      res();
    });
  });
};
