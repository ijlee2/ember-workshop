import type { TOC } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';
import ProductsProductDetails from 'my-app/components/products/product/details';
import type ProductsProductController from 'my-app/controllers/products/product';
import type { Model } from 'my-app/routes/products/product';

import styles from './product.module.css';

interface ProductsProductSignature {
  Args: {
    controller: ProductsProductController;
    model: Model;
  };
}

<template>
  {{pageTitle @model.name}}

  <div class={{styles.product-details}}>
    <ProductsProductDetails @product={{@model}} />
  </div>
</template> satisfies TOC<ProductsProductSignature>;
