import type { TOC } from '@ember/component/template-only';
import { isTesting, macroCondition } from '@embroider/macros';

import styles from './image.css';

interface ProductsProductImageSignature {
  Args: {
    src: string;
  };
}

const ProductsProductImageComponent: TOC<ProductsProductImageSignature> =
  macroCondition(isTesting()) ?
    <template>
      <div class={{styles.placeholder-image}}></div>
    </template> :
    <template>
      <img
        alt=""
        class={{styles.image}}
        src={{@src}}
      />
    </template>

export default ProductsProductImageComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Products::Product::Image': typeof ProductsProductImageComponent;
  }
}
