import Component from '@glimmer/component';

import styles from './<%= data.localFileName %>.module.css';

interface <%= options.entity.pascalizedName %>Signature {
  Args: {};
  Blocks: {
    default: [];
  };
  Element: null;
}

export default class <%= options.entity.pascalizedName %> extends Component<<%= options.entity.pascalizedName %>Signature> {
  <template>
    <div class={{styles.container}}>
      {{yield}}
    </div>
  </template>
}
