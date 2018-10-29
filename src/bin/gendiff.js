#!/usr/bin/env node
//import { description } from '../../package.json';

const program = require('commander');

program
  .description('Compares two configuration files and shows a difference')
  .option('-v, --version', 'output the version number')
  .option('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .parse(process.argv);
