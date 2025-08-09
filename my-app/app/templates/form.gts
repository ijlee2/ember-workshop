import type { TOC } from '@ember/component/template-only';
import { t } from 'ember-intl';
import { pageTitle } from 'ember-page-title';
import { UiForm, UiPage } from 'my-addon';
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

  <UiPage @title={{t "routes.form.title"}}>
    <UiForm
      @data={{@controller.initialData}}
      @instructions={{t "routes.form.contact-me-form.instructions"}}
      @onSubmit={{@controller.submitData}}
      @title={{t "routes.form.contact-me-form.title"}}
    />
  </UiPage>
</template> satisfies TOC<FormSignature>;
