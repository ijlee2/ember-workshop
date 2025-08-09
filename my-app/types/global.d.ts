import '@glint/environment-ember-loose';
import '@glint/environment-ember-template-imports';

import type EmberComposableHelpersRegistry from '@nullvoxpopuli/ember-composable-helpers/template-registry';
import type EmberA11yRefocusRegistry from 'ember-a11y-refocus/template-registry';
import type EmberConcurrencyRegistry from 'ember-concurrency/template-registry';
import type EmberContainerQueryRegistry from 'ember-container-query/template-registry';
import type EmberIntlRegistry from 'ember-intl/template-registry';
import type EmberPageTitleRegistry from 'ember-page-title/template-registry';
import type EmberTruthHelpersRegistry from 'ember-truth-helpers/template-registry';
import type EmbroiderCssModulesRegistry from 'embroider-css-modules/template-registry';
import type MyAddonRegistry from 'my-addon/template-registry';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry
    extends EmberA11yRefocusRegistry,
      EmberComposableHelpersRegistry,
      EmberConcurrencyRegistry,
      EmberContainerQueryRegistry,
      EmberIntlRegistry,
      EmberPageTitleRegistry,
      EmberTruthHelpersRegistry,
      EmbroiderCssModulesRegistry,
      MyAddonRegistry {
    // Add any registry entries from other addons here that your addon itself uses (in non-strict mode templates)
    // See https://typed-ember.gitbook.io/glint/using-glint/ember/using-addons
  }
}

declare module 'ember-page-title/test-support' {
  const getPageTitle: () => string;

  export { getPageTitle };
}
