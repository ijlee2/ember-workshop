import type { TOC } from '@ember/component/template-only';

import styles from './template-only.module.css';

interface MyComponentTemplateOnlySignature {
  Args: {};
}

const MyComponentTemplateOnly = <template>
  <div class={{styles.container}}>
    {{yield}}
  </div>
</template> satisfies TOC<MyComponentTemplateOnlySignature>;

export default MyComponentTemplateOnly;
