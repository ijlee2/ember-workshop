import Component from '@glimmer/component';

import styles from './glimmer.module.css';

interface MyComponentGlimmerSignature {
  Args: {};
  Blocks: {
    default: [];
  };
  Element: null;
}

export default class MyComponentGlimmer extends Component<MyComponentGlimmerSignature> {
  <template>
    <div class={{styles.container}}>
      {{yield}}
    </div>
  </template>
}
