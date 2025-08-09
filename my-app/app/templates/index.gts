import type { TOC } from '@ember/component/template-only';
import { t } from 'ember-intl';

interface IndexSignature {
  Args: {
    controller: unknown;
    model: unknown;
  };
}

<template>
  <div>
    <h1>
      {{t "routes.index.title"}}
    </h1>

    <div>
      <p>
        {{t "routes.index.description" htmlSafe=true}}
      </p>
    </div>
  </div>
</template> satisfies TOC<IndexSignature>;
