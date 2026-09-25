#!/usr/bin/env node
'use strict';

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { run } from '../src/index.js';
import type { CodemodOptions } from '../src/types/index.js';

// Provide a title to the process in `ps`
process.title = 'ember-test';

// Set codemod options
const argv = yargs(hideBin(process.argv))
  .option('path', {
    describe: 'Relative path to the test build',
    type: 'string',
  })
  .option('root', {
    describe: 'Where to run the codemod',
    type: 'string',
  })
  .option('test-port', {
    describe:
      'Port for running tests. Pass 0 to automatically pick an available port.',
    type: 'number',
  })
  .option('server', {
    alias: 's',
    describe: 'Launch test browser',
    type: 'boolean',
  })
  .parseSync();

const codemodOptions: CodemodOptions = {
  path: argv['path'] ?? 'dist',
  projectRoot: argv['root'] ?? process.cwd(),
  testPort: argv['test-port'],
  server: argv['server'],
};

void run(codemodOptions);
