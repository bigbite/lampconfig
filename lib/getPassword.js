const chalk = require('chalk');
const inquirer = require('inquirer');
const prompt = inquirer.createPromptModule();

const getPassword = (promptMessage, callback) => {
  const promptForPassword = (message) => {
    return prompt({type: 'password', name: 'password', message}).then((input) => input.password);
  };

  promptForPassword(promptMessage)
    .then((password) => {
      promptForPassword('Please confirm password.')
        .then((validatePassword) => {
          if (password === validatePassword) return callback(password);
          console.log(chalk.red(">> Your password didn't match, please try again."));
          getPassword(promptMessage, callback);
        });
    });
};

module.exports = getPassword;