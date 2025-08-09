import type { TOC } from '@ember/component/template-only';

import styles from './template-only.module.css';

interface MyComponentTemplateOnlySignature {
  Args: {};
}

const MyComponentTemplateOnly: TOC<MyComponentTemplateOnlySignature> = <template>
  <div class={{styles.container}}></div>
</template>;

export default MyComponentTemplateOnly;
