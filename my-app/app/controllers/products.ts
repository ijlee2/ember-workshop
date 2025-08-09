import Controller from '@ember/controller';
import { isTesting, macroCondition } from '@embroider/macros';
import { tracked } from '@glimmer/tracking';
import { restartableTask, timeout } from 'ember-concurrency';

const TIMEOUT_IN_MILLISECONDS = macroCondition(isTesting()) ? 1 : 300;

export default class ProductsController extends Controller {
  queryParams = ['name'];

  @tracked name: string | null = null;

  updateQueryParameters = restartableTask(
    async ({ key, value }: { key: string; value?: string }) => {
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
