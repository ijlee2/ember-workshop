import type { TOC } from '@ember/component/template-only';
import { t } from 'ember-intl';
import { pageTitle } from 'ember-page-title';
import type FormController from 'my-app/controllers/form';
import type { Model } from 'my-app/routes/form';

interface FormSignature {
  Args: {
    controller: FormController;
    model: Model;
  };
}

<template>
  {{pageTitle (t "routes.form.title")}}

  <div>
    <h1>
      {{t "routes.form.title"}}
    </h1>

    <div>
      {{outlet}}
    </div>
  </div>
</template> satisfies TOC<FormSignature>;
