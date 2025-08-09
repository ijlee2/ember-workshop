import type { TestContext } from '@ember/test-helpers';
import type { Server } from 'miragejs';

import createServer from '../../../mirage/servers/default';
import type { ExtendedQUnitConfig } from '../../test-helper';

export interface MirageTestContext extends TestContext {
  server: Server;
}

export function setupMirage(hooks: NestedHooks): void {
  hooks.beforeEach(function (this: MirageTestContext) {
    this.server = createServer({
      environment: 'test',
    });

    if ((QUnit.config as ExtendedQUnitConfig).mirageLogging) {
      this.server.logging = true;
    }

    this.server.timing = 0;
  });

  hooks.afterEach(function (this: MirageTestContext) {
    this.server.shutdown();
  });
}
