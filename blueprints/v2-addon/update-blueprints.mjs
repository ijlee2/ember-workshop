#!/usr/bin/env node
'use strict';

// eslint-disable-next-line import-x/default
import gitDiffApply from 'git-diff-apply';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const CURRENT_VERSION = '1.2.0';

async function updateBlueprints({ from, to }) {
  const startTag = from;
  const endTag = to;

  try {
    await gitDiffApply({
      cwd: process.cwd(),
      endTag,
      ignoredFiles: ['CHANGELOG.md'],
      remoteUrl: 'https://github.com/ijlee2/blueprints-v2-addon-output/',
      startTag,
    });
  } catch (error) {
    console.error(`git-diff-apply: ${error}`);
  }
}

// Provide a title to the process in `ps`
process.title = 'update-blueprints';

yargs(hideBin(process.argv))
  .command({
    builder: (yargs) => {
      return yargs
        .option('from', {
          default: CURRENT_VERSION,
          describe: "The start version (e.g. '0.1.0')",
          type: 'string',
        })
        .option('to', {
          describe: "The end version (e.g. '0.2.0')",
          type: 'string',
        })
        .demandOption(['to']);
    },
    command: '*',
    describe: 'Updates the blueprints for v2 addons',
    handler: (argv) => {
      updateBlueprints(argv);
    },
  })
  .demandCommand()
  .strict()
  .parseSync();
