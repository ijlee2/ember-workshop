#!/usr/bin/env node
'use strict';

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { runDestroy, runGenerate } from '../src/index.js';

// Provide a title to the process in `ps`
process.title = 'blueprints-v2-addon';

// Set codemod options
const DEFAULT_BLUEPRINT_VALUE = {
  component: 'template-only',
  helper: 'function',
  modifier: 'function',
  service: 'class',
  util: 'function',
} as const;

yargs(hideBin(process.argv))
  .command({
    aliases: ['d'],
    builder: (yargs) => {
      return yargs
        .positional('entity-type', {
          choices: [
            'component',
            'helper',
            'modifier',
            'service',
            'util',
          ] as const,
          describe: 'Entity type',
          type: 'string',
        })
        .positional('name', {
          describe: 'Entity name',
          type: 'string',
        })
        .option('root', {
          describe: 'Where to run the codemod',
          type: 'string',
        })
        .option('test-app-location', {
          demandOption: true,
          describe: 'Location of the test-app',
          type: 'string',
        })
        .demandOption(['entity-type', 'name']);
    },
    command: 'destroy [entity-type] [name]',
    describe: 'Removes code and its test file',
    handler: (argv) => {
      runDestroy({
        entity: {
          name: argv['name'],
          type: argv['entity-type'],
        },
        projectRoot: argv['root'] ?? process.cwd(),
        testAppLocation: argv['test-app-location'],
      });
    },
  })
  .command({
    aliases: ['g'],
    builder: (yargs) => {
      return yargs
        .positional('entity-type', {
          choices: [
            'component',
            'helper',
            'modifier',
            'service',
            'util',
          ] as const,
          describe: 'Entity type',
          type: 'string',
        })
        .option('root', {
          describe: 'Where to run the codemod',
          type: 'string',
        })
        .option('test-app-location', {
          demandOption: true,
          describe: 'Location of the test-app',
          type: 'string',
        })
        .command({
          builder: (yargs) => {
            return yargs
              .positional('name', {
                demandOption: true,
                describe: 'Entity name',
                type: 'string',
              })
              .option('blueprint', {
                choices: ['glimmer', 'template-only'] as const,
                describe: 'Which blueprint to run',
                type: 'string',
              })
              .demandOption(['name']);
          },
          command: 'component [name]',
          describe: 'Creates a component and its test file',
          handler: (argv) => {
            runGenerate({
              entity: {
                blueprint:
                  argv['blueprint'] ?? DEFAULT_BLUEPRINT_VALUE.component,
                name: argv['name'],
                type: 'component',
              },
              projectRoot: argv['root'] ?? process.cwd(),
              testAppLocation: argv['test-app-location'],
            });
          },
        })
        .command({
          builder: (yargs) => {
            return yargs
              .positional('name', {
                demandOption: true,
                describe: 'Entity name',
                type: 'string',
              })
              .option('blueprint', {
                choices: ['class', 'function'] as const,
                describe: 'Which blueprint to run',
                type: 'string',
              })
              .demandOption(['name']);
          },
          command: 'helper [name]',
          describe: 'Creates a helper and its test file',
          handler: (argv) => {
            runGenerate({
              entity: {
                blueprint: argv['blueprint'] ?? DEFAULT_BLUEPRINT_VALUE.helper,
                name: argv['name'],
                type: 'helper',
              },
              projectRoot: argv['root'] ?? process.cwd(),
              testAppLocation: argv['test-app-location'],
            });
          },
        })
        .command({
          builder: (yargs) => {
            return yargs
              .positional('name', {
                demandOption: true,
                describe: 'Entity name',
                type: 'string',
              })
              .option('blueprint', {
                choices: ['class', 'function'] as const,
                describe: 'Which blueprint to run',
                type: 'string',
              })
              .demandOption(['name']);
          },
          command: 'modifier [name]',
          describe: 'Creates a modifier and its test file',
          handler: (argv) => {
            runGenerate({
              entity: {
                blueprint:
                  argv['blueprint'] ?? DEFAULT_BLUEPRINT_VALUE.modifier,
                name: argv['name'],
                type: 'modifier',
              },
              projectRoot: argv['root'] ?? process.cwd(),
              testAppLocation: argv['test-app-location'],
            });
          },
        })
        .command({
          builder: (yargs) => {
            return yargs
              .positional('name', {
                demandOption: true,
                describe: 'Entity name',
                type: 'string',
              })
              .option('blueprint', {
                choices: ['class'] as const,
                describe: 'Which blueprint to run',
                type: 'string',
              })
              .demandOption(['name']);
          },
          command: 'service [name]',
          describe: 'Creates a service and its test file',
          handler: (argv) => {
            runGenerate({
              entity: {
                blueprint: argv['blueprint'] ?? DEFAULT_BLUEPRINT_VALUE.service,
                name: argv['name'],
                type: 'service',
              },
              projectRoot: argv['root'] ?? process.cwd(),
              testAppLocation: argv['test-app-location'],
            });
          },
        })
        .command({
          builder: (yargs) => {
            return yargs
              .positional('name', {
                demandOption: true,
                describe: 'Entity name',
                type: 'string',
              })
              .option('blueprint', {
                choices: ['function'] as const,
                describe: 'Which blueprint to run',
                type: 'string',
              })
              .demandOption(['name']);
          },
          command: 'util [name]',
          describe: 'Creates a utility and its test file',
          handler: (argv) => {
            runGenerate({
              entity: {
                blueprint: argv['blueprint'] ?? DEFAULT_BLUEPRINT_VALUE.util,
                name: argv['name'],
                type: 'util',
              },
              projectRoot: argv['root'] ?? process.cwd(),
              testAppLocation: argv['test-app-location'],
            });
          },
        })
        .demandCommand();
    },
    command: 'generate [entity-type]',
    describe: 'Creates code and its test file',
    handler: () => {},
  })
  .demandCommand()
  .strict()
  .parseSync();
