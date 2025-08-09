import type { TOC } from '@ember/component/template-only';
import { t } from 'ember-intl';
import { pageTitle } from 'ember-page-title';
import { UiPage } from 'my-addon';
import ProductsProductCard from 'my-app/components/products/product/card';
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
    <div class={{styles.products}}>
      <div class={{styles.filters}}>
        Filters
      </div>

      <div class={{styles.list}}>
        {{#each @model as |product|}}
          <div>
            <ProductsProductCard
              @product={{product}}
              @redirectTo="product-details"
            />
          </div>
        {{else}}
          <p>
            {{t "routes.products.no-products-found"}}
          </p>
        {{/each}}
      </div>

      <div class={{styles.product-details}}>
        {{outlet}}
      </div>
    </div>
  </UiPage>
</template> satisfies TOC<ProductsSignature>;
