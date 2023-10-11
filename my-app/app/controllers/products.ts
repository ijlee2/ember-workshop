import Controller from '@ember/controller';
import { type Registry as Services, service } from '@ember/service';
import { isTesting, macroCondition } from '@embroider/macros';
import { tracked } from '@glimmer/tracking';
import { restartableTask, timeout } from 'ember-concurrency';

import type { Model } from '../routes/products';
import styles from './products.css';

const TIMEOUT_IN_MILLISECONDS = macroCondition(isTesting()) ? 1 : 300;

export default class ProductsController extends Controller {
  declare model: Model;

  styles = styles;

  queryParams = ['name'];

  @service declare experiments: Services['experiments'];

  @tracked name: string | null = null;

  updateQueryParameters = restartableTask(
    async ({ key, value }: { key: string; value: any }) => {
      if (key !== 'name') {
        return;
      }

      await timeout(TIMEOUT_IN_MILLISECONDS);

      if (value === undefined || value === '') {
        this[key] = null;
        return;
      }

      this[key] = value;
    },
  );
}
