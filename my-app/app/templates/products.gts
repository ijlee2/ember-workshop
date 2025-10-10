import type { TOC } from '@ember/component/template-only';
import { hash } from '@ember/helper';
import perform from 'ember-concurrency/helpers/perform';
import { t } from 'ember-intl';
import { pageTitle } from 'ember-page-title';
import { UiFormInput, UiPage } from 'my-addon';
import ProductsProductCard from 'my-app/components/products/product/card';
import type ProductsController from 'my-app/controllers/products';
import experiment from 'my-app/helpers/experiment';
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
    <div
      class={{if
        (experiment name="nest-product-details" variant="v1")
        styles.products-with-details
        styles.products
      }}
    >
      <div class={{styles.filters}}>
        <div class={{styles.filter}}>
          <UiFormInput
            @data={{hash name=@controller.name}}
            @key="name"
            @label={{t "routes.products.filter-by.name.label"}}
            @onUpdate={{perform @controller.updateQueryParameters}}
            @placeholder={{t "routes.products.filter-by.name.placeholder"}}
          />
        </div>
      </div>

      <div class={{styles.list}}>
        {{#each @model as |product|}}
          <div>
            <ProductsProductCard
              @product={{product}}
              @redirectTo={{if
                (experiment name="nest-product-details" variant="v1")
                "products.product"
                "product-details"
              }}
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
