#!/usr/bin/env node

import gendiff from '../src/index.js';
import { Command } from 'commander';
const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format <type>', 'output format')
  .argument('<filepath1> <filepath2>')
  .action((file1, file2) => {
    console.log(gendiff(file1, file2))
});
program.parse();
