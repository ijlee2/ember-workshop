import { get } from '@ember/object';
import Service from '@ember/service';
import config from 'ember-workshop/config/environment';

export default class ConfigService extends Service {
  customization = {
    experiments: {
      'nest-product-details': {
        control: 0.5,
        v1: 0.5,
      },

      'subscribe-to-ember-times': {
        control: 0.7,
        v1: 0.3,
      },
    },
  };

  isTestEnvironment = config.environment === 'test';

  getValue(key) {
    return get(this.customization, key);
  }
}
