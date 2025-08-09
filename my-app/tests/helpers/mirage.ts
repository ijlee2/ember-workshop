import type { TestContext } from '@ember/test-helpers';
import type { Server } from 'miragejs';
// @ts-expect-error: Incorrect type
import createServer from 'my-app/mirage/servers/default';

export interface MirageTestContext extends TestContext {
  server: Server;
}

export function setupMirage(hooks: NestedHooks) {
  hooks.beforeEach(function (this: MirageTestContext) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    this.server = createServer({
      environment: 'test',
    });
  });

  hooks.afterEach(function (this: MirageTestContext) {
    this.server.shutdown();
  });
}
