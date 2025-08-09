import type { TOC } from '@ember/component/template-only';

import styles from './<%= data.localFileName %>.module.css';

interface <%= options.entity.pascalizedName %>Signature {
  Args: {};
}

const <%= options.entity.pascalizedName %> = <template>
  <div class={{styles.container}}>
    {{yield}}
  </div>
</template> satisfies TOC<<%= options.entity.pascalizedName %>Signature>;

export default <%= options.entity.pascalizedName %>;
