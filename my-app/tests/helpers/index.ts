import type { TestContext } from '@ember/test-helpers';
import { setupMirage } from 'ember-cli-mirage/test-support';
import {
  setupApplicationTest as upstreamSetupApplicationTest,
  setupRenderingTest as upstreamSetupRenderingTest,
  setupTest as upstreamSetupTest,
  type SetupTestOptions,
} from 'ember-qunit';
import type { Server } from 'miragejs';

import { setupExperiments } from './services/experiments';

// This file exists to provide wrappers around ember-qunit's
// test setup functions. This way, you can easily extend the setup that is
// needed per test type.

export interface ApplicationTestContext extends TestContext {
  server: Server;
}

function setupApplicationTest(hooks: NestedHooks, options?: SetupTestOptions) {
  upstreamSetupApplicationTest(hooks, options);

  // Additional setup for application tests can be done here.
  setupMirage(hooks);
  setupExperiments(hooks);
}

function setupRenderingTest(hooks: NestedHooks, options?: SetupTestOptions) {
  upstreamSetupRenderingTest(hooks, options);

  // Additional setup for rendering tests can be done here.
}

function setupTest(hooks: NestedHooks, options?: SetupTestOptions) {
  upstreamSetupTest(hooks, options);

  // Additional setup for unit tests can be done here.
}

export {
  setupApplicationTest,
  setupExperiments,
  setupRenderingTest,
  setupTest,
};

export * from './routes/form';
export * from './routes/products';
