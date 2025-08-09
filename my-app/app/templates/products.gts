import type { TOC } from '@ember/component/template-only';
import { t } from 'ember-intl';
import { pageTitle } from 'ember-page-title';
import { UiPage } from 'my-addon';
import type ProductsController from 'my-app/controllers/products';
import type { Model } from 'my-app/routes/products';

import styles from './products.module.css';

interface ProductsSignature {
  Args: {
    controller: ProductsController;
    model: Model;
  };
}

<template>
  {{pageTitle (t "routes.products.title")}}

  <UiPage @title={{t "routes.products.title"}}>
    <div class={{styles.products-with-details}}>
      <div class={{styles.filters}}>
        Filters
      </div>

      <div class={{styles.list}}>
        List of products
      </div>

      <div class={{styles.product-details}}>
        {{outlet}}
      </div>
    </div>
  </UiPage>
</template> satisfies TOC<ProductsSignature>;
