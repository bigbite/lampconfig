#!/usr/bin/env node

"use strict";

const createStore = require('./lib/store');
const program = require('commander');
const buildServer = require('./lib/buildServer');
const addSite = require('./lib/addSite');
const toggleErrors = require('./lib/toggleErrors');

const store = createStore('/etc/lampconfig', 'config.js');

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
  .action(() => buildServer(store));

/**
 * Site Command
 */
program
  .command('site [env]')
  .description('Add a site')
  .action(() => addSite(store));

/**
 * Errors Command
 */
program
  .command('errors [env]')
  .description('Toggle php errors')
  .action(() => toggleErrors(store));

/**
 * Run Programme
 */
program
  .parse(process.argv);



