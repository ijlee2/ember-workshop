import type { TOC } from '@ember/component/template-only';
import { t } from 'ember-intl';
import { pageTitle } from 'ember-page-title';

interface ApplicationSignature {
  Args: {
    controller: unknown;
    model: unknown;
  };
}

<template>
  {{pageTitle (t "routes.application.app-name")}}
</template> satisfies TOC<ApplicationSignature>;
