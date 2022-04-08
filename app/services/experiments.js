import { assert } from '@ember/debug';
import Service, { inject as service } from '@ember/service';

export default class ExperimentsService extends Service {
  @service config;

  get pdfs() {
    return this.config.getValue('experiments') ?? {};
  }

  constructor() {
    super(...arguments);

    this.#initializeVariants();
  }

  getVariant(experimentName) {
    const pdf = this.pdfs[experimentName];

    assert(
      `${experimentName} is an unknown experiment. Please define the experiment in the config service.`,
      typeof pdf === 'object',
    );

    const cachedVariant = this.cachedVariants[experimentName];

    if (cachedVariant) {
      return cachedVariant;
    }

    this.#determineVariant(experimentName);

    return this.cachedVariants[experimentName];
  }

  setVariant(experimentName, variant) {
    const pdf = this.pdfs[experimentName];
    const variants = Object.keys(pdf);

    assert(
      `${variant} is an unknown variant for ${experimentName}. Please check for typos.`,
      variants.includes(variant),
    );

    this.cachedVariants[experimentName] = variant;
  }

  #determineVariant(experimentName) {
    const pdf = this.pdfs[experimentName];
    const variants = Object.keys(pdf);

    let total = 0;
    const sample = Math.random();

    for (let variant of variants) {
      total += pdf[variant];

      if (sample < total) {
        this.setVariant(experimentName, variant);
        break;
      }
    }
  }

  #initializeVariants() {
    const cachedVariants = {};
    const experimentNames = Object.keys(this.pdfs);

    experimentNames.forEach((experimentName) => {
      cachedVariants[experimentName] = undefined;
    });

    this.cachedVariants = cachedVariants;
  }
}
