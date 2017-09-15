#!/usr/bin/env node

"use strict";

const program = require('commander');
const buildServer = require('./lib/buildServer');
const addSite = require('./lib/addSite');

const inquirer = require('inquirer');
const prompt = inquirer.createPromptModule();

/**
* Set Program Options
*/
program
  .version('0.1.0')
  .arguments('<cmd> [env]');

/**
* Build Command
*/
program
  .command('build [env]')
  .description('Build a LAMP stack')
  .action(buildServer);

/**
 * Site Command
 */
program
  .command('site [env]')
  .description('Add a site')
  .action(addSite);

/**
 * Run Programme
 */
program
  .parse(process.argv);



