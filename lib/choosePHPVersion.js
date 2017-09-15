const inquirer = require('inquirer');

const choosePHPVersion = () => {
  return new Promise((resolve, reject) => {
    inquirer.prompt([{
      type: 'list',
      name: 'phpVersion',
      message: 'What PHP Version would you like to use?',
      choices: ['5.6', '7.0', '7.1']
    }]).then((answers) => {
        resolve(answers.phpVersion);
    });
  });
};

module.exports = choosePHPVersion;