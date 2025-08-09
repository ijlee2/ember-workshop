import type { TOC } from '@ember/component/template-only';

import styles from './template-only.module.css';

interface MyComponentTemplateOnlySignature {
  Args: {};
  Blocks: {
    default: [];
  };
  Element: null;
}

const MyComponentTemplateOnly = <template>
  <div class={{styles.container}}>
    {{yield}}
  </div>
</template> satisfies TOC<MyComponentTemplateOnlySignature>;

export default MyComponentTemplateOnly;
