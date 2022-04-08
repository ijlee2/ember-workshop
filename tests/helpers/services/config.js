import { get } from '@ember/object';
import Service from '@ember/service';

export function setupConfigService(hooks, customization = {}) {
  hooks.beforeEach(function () {
    this.owner.register(
      'service:config',
      class ConfigService extends Service {
        customization = customization;

        isTestEnvironment = true;

        getValue(key) {
          return get(this.customization, key);
        }
      },
    );
  });

  hooks.afterEach(function () {
    this.owner.unregister('service:config');
  });
}
