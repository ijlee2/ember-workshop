import { assert } from '@ember/debug';
import Service, { service } from '@ember/service';
// eslint-disable-next-line import/named
import { cached } from '@glimmer/tracking';

export default class ExperimentsService extends Service {
  @service config;

  @cached get cdfs() {
    const experiments = this.config.getValue('experiments') ?? {};
    const cdfs = new Map();

    for (const [experimentName, pdf] of Object.entries(experiments)) {
      const cdf = new Map();
      let total = 0;

      for (const [variant, probability] of Object.entries(pdf)) {
        total += probability;
        cdf.set(variant, total);
      }

      cdfs.set(experimentName, cdf);
    }

    return cdfs;
  }

  constructor() {
    super(...arguments);

    this.#initializeVariants();
  }

  getVariant(experimentName) {
    assert(
      `${experimentName} is an unknown experiment. Please define the experiment in the config service.`,
      this.cdfs.has(experimentName),
    );

    const cachedVariant = this.cachedVariants[experimentName];

    if (cachedVariant) {
      return cachedVariant;
    }

    this.#determineVariant(experimentName);

    return this.cachedVariants[experimentName];
  }

  setVariant(experimentName, variant) {
    const cdf = this.cdfs.get(experimentName);

    assert(
      `${variant} is an unknown variant for ${experimentName}. Please check for typos.`,
      cdf.has(variant),
    );

    this.cachedVariants[experimentName] = variant;
  }

  #determineVariant(experimentName) {
    const cdf = this.cdfs.get(experimentName);
    const sample = Math.random();

    for (const [variant, total] of cdf.entries()) {
      if (sample < total) {
        this.setVariant(experimentName, variant);
        break;
      }
    }
  }

  #initializeVariants() {
    const cachedVariants = {};

    this.cdfs.forEach((cdf, experimentName) => {
      cachedVariants[experimentName] = undefined;
    });

    this.cachedVariants = cachedVariants;
  }
}
