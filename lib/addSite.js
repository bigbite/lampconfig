const chalk = require('chalk');
const shell = require('shelljs');
const runCommand = require('./runCommand');
const inquirer = require('inquirer');
const prompt = inquirer.createPromptModule();
const vhosts = require('./vhosts');
const setUpGit = require('./git');

const getSiteInfo = [{
  name: 'site',
  message: 'What is the name of the site?',
  validate: (input) => {
    if (!/\S/.test(input)) return `You can't leave this value blank`;
    if (!/^[A-Za-z-]+$/.test(input)) return 'You can only use characters and hyphens.';
    return true;
  }
}, {
  name: 'rootDir',
  message: 'What is the root directory of your site?',
  validate: (input) => {
    if (!/\S/.test(input)) return `You can't leave this value blank`;
    return true;
  },
  filter: (input) => {
    if (input.charAt(0) === '/') return input;
    return `/${input}`;
  }
}, {
  name: 'domain',
  message: 'What is your domain?',
  validate: (input) => {
    if (!/\S/.test(input)) return `You can't leave this value blank`;
    return true;
  }
}, {
  name: 'alias',
  message: 'What aliases do you need? Enter multiple seperated by a space.',
}, {
  name: 'email',
  message: 'Please enter an email address (used for urgent renewal and security notices)',
  validate: (input) => {
    if (!/\S/.test(input)) return `You can't leave this value blank`;
    if (!input.indexOf("@") > 0) return `Please enter a valid email address`
    return true;
  }
}];

module.exports = (store) => {
  prompt(getSiteInfo)
    .then((answers) => {
      setUpGit(answers.site)
        .then(() => vhosts(answers))
        .then(() => runCommand({
          loader: 'Enabling HTTPS with certbot...',
          cmd: `echo "${answers.email}" | sudo certbot --apache -d ${answers.domain} ${answers.alias.split(' ').map(x => `-d ${x} `).join('')}`,
          success: 'HTTPS enabled.'
        }))
    });
};
