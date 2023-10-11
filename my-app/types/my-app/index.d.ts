import '@glint/environment-ember-loose';
import '@glint/environment-ember-template-imports';
import 'ember-source/types';

import type { ComponentLike, HelperLike } from '@glint/template';
import type EmberConcurrencyRegistry from 'ember-concurrency/template-registry';
import type EmberContainerQueryRegistry from 'ember-container-query/template-registry';
import type EmberIntlRegistry from 'ember-intl/template-registry';
import type EmberPageTitleRegistry from 'ember-page-title/template-registry';
import type EmberTruthHelpersRegistry from 'ember-truth-helpers/template-registry';
import type EmbroiderCssModulesRegistry from 'embroider-css-modules/template-registry';
import type MyAddonRegistry from 'my-addon/template-registry';

type NavigationNarratorComponent = ComponentLike<{
  Args: {
    navigationText: string;
    skipText: string;
    skipTo: string;
  };
}>;

type SortByHelper = HelperLike<{
  Args: { Positional: [sortKey: string, items: any[]] };
  Return: any[];
}>;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry
    extends EmberConcurrencyRegistry,
      EmberContainerQueryRegistry,
      EmberIntlRegistry,
      EmberPageTitleRegistry,
      EmberTruthHelpersRegistry,
      EmbroiderCssModulesRegistry,
      MyAddonRegistry {
    // Add any registry entries from other addons here that your addon itself uses (in non-strict mode templates)
    // See https://typed-ember.gitbook.io/glint/using-glint/ember/using-addons
    NavigationNarrator: NavigationNarratorComponent;
    'sort-by': SortByHelper;
  }
}
