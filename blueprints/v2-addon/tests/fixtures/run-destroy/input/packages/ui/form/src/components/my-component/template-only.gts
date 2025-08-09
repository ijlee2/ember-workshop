import type { TOC } from '@ember/component/template-only';

import styles from './template-only.module.css';

interface MyComponentTemplateOnlySignature {
  Args: {};
  Blocks: {
    default: [];
  };
  Element: null;
}

const MyComponentTemplateOnly: TOC<MyComponentTemplateOnlySignature> =
  <template>
    <div class={{styles.container}}>
      {{yield}}
    </div>
  </template>;

export default MyComponentTemplateOnly;
