import { assertFixture, loadFixture, test } from '@codemod-utils/tests';

import { runDestroy } from '../../../src/index.js';
import {
  inputProject,
  outputProject,
} from '../../fixtures/run-destroy/index.js';

const fixtureRoot = 'tmp/run-destroy';

function runCommands() {
  runDestroy({
    entity: {
      name: 'my-component/glimmer',
      type: 'component',
    },
    projectRoot: `${fixtureRoot}/packages/ui/form`,
    testAppLocation: '../../../test-app',
  });

  runDestroy({
    entity: {
      name: 'my-component/template-only',
      type: 'component',
    },
    projectRoot: `${fixtureRoot}/packages/ui/form`,
    testAppLocation: '../../../test-app',
  });

  runDestroy({
    entity: {
      name: 'my-helper/class',
      type: 'helper',
    },
    projectRoot: `${fixtureRoot}/packages/ui/form`,
    testAppLocation: '../../../test-app',
  });

  runDestroy({
    entity: {
      name: 'my-helper/function',
      type: 'helper',
    },
    projectRoot: `${fixtureRoot}/packages/ui/form`,
    testAppLocation: '../../../test-app',
  });

  runDestroy({
    entity: {
      name: 'my-modifier/class',
      type: 'modifier',
    },
    projectRoot: `${fixtureRoot}/packages/ui/form`,
    testAppLocation: '../../../test-app',
  });

  runDestroy({
    entity: {
      name: 'my-modifier/function',
      type: 'modifier',
    },
    projectRoot: `${fixtureRoot}/packages/ui/form`,
    testAppLocation: '../../../test-app',
  });

  runDestroy({
    entity: {
      name: 'my-service/class',
      type: 'service',
    },
    projectRoot: `${fixtureRoot}/packages/ui/form`,
    testAppLocation: '../../../test-app',
  });

  runDestroy({
    entity: {
      name: 'my-util/function',
      type: 'util',
    },
    projectRoot: `${fixtureRoot}/packages/ui/form`,
    testAppLocation: '../../../test-app',
  });
}

test('index | run-destroy > typescript', function () {
  loadFixture(inputProject, { projectRoot: fixtureRoot });

  runCommands();

  assertFixture(outputProject, { projectRoot: fixtureRoot });

  // Check idempotence
  runCommands();

  assertFixture(outputProject, { projectRoot: fixtureRoot });
});
