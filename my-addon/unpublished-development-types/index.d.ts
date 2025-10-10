// Add any types here that you need for local development only.
// These will *not* be published as part of your addon, so be careful that your published code does not rely on them!

import '@glint/environment-ember-loose';
import '@glint/environment-ember-template-imports';

import type EmberContainerQueryRegistry from 'ember-container-query/template-registry';
import type EmberIntlRegistry from 'ember-intl/template-registry';
import type EmberTruthHelpersRegistry from 'ember-truth-helpers/template-registry';
import type EmbroiderCssModulesRegistry from 'embroider-css-modules/template-registry';

import type MyAddonRegistry from '../src/template-registry.ts';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry
    extends MyAddonRegistry,
      EmberContainerQueryRegistry,
      EmberIntlRegistry,
      EmberTruthHelpersRegistry,
      EmbroiderCssModulesRegistry {
    // Add any registry entries from other addons here that your addon itself uses (in non-strict mode templates)
    // See https://typed-ember.gitbook.io/glint/using-glint/ember/using-addons
  }
}
