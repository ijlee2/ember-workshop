import type { TOC } from '@ember/component/template-only';
import { t } from 'ember-intl';
import { pageTitle } from 'ember-page-title';
import { UiPage } from 'my-addon';
import type ProductsController from 'my-app/controllers/products';
import type { Model } from 'my-app/routes/products';

interface ProductsSignature {
  Args: {
    controller: ProductsController;
    model: Model;
  };
}

<template>
  {{pageTitle (t "routes.products.title")}}

  <UiPage @title={{t "routes.products.title"}}>
    {{outlet}}
  </UiPage>
</template> satisfies TOC<ProductsSignature>;
