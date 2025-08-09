import type { TOC } from '@ember/component/template-only';
import { t } from 'ember-intl';

import styles from './error.module.css';

interface ProductsErrorSignature {
  Args: {
    controller: unknown;
    model?: Error;
  };
}

<template>
  <div class={{styles.container}}>
    <p data-test-error-message>
      {{if @model @model (t "routes.error.default-message")}}
    </p>
  </div>
</template> satisfies TOC<ProductsErrorSignature>;
