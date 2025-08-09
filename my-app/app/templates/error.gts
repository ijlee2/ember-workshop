import type { TOC } from '@ember/component/template-only';
import { t } from 'ember-intl';
import { UiPage } from 'my-addon';

interface ErrorSignature {
  Args: {
    controller: unknown;
    model?: Error;
  };
}

<template>
  <UiPage @title="error.hbs">
    <p data-test-error-message>
      {{if @model @model (t "routes.error.default-message")}}
    </p>
  </UiPage>
</template> satisfies TOC<ErrorSignature>;
