import type { TOC } from '@ember/component/template-only';

import styles from './<%= data.localFileName %>.module.css';

interface <%= options.entity.pascalizedName %>Signature {
  Args: {};
}

const <%= options.entity.pascalizedName %>: TOC<<%= options.entity.pascalizedName %>Signature> = <template>
  <div class={{styles.container}}></div>
</template>;

export default <%= options.entity.pascalizedName %>;
