#!/usr/bin/env node
import program from 'commander';
import gendiff from '..';

program
  .description('Compares two configuration files and shows a difference')
  .option('-v, --version', 'output the version number')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    console.log(gendiff(firstConfig, secondConfig, program.format));
  })
  .parse(process.argv);
