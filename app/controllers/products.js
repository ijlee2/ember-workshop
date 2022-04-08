import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { restartableTask, timeout } from 'ember-concurrency';

export default class ProductsController extends Controller {
  @service config;
  @service experiments;

  queryParams = ['name'];

  @tracked name;

  get isPartOfNestProductDetailsExperiment() {
    return this.experiments.getVariant('nest-product-details') === 'v1';
  }

  @action resetQueryParameters() {
    this.name = null;
  }

  updateQueryParameters = restartableTask(async ({ key, value }) => {
    const TIMEOUT_IN_MILLISECONDS = this.config.isTestEnvironment ? 1 : 300;

    await timeout(TIMEOUT_IN_MILLISECONDS);

    if (value === undefined || value === '') {
      this[key] = null;
      return;
    }

    this[key] = value;
  });
}
