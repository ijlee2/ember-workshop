import type { NamedArgs, PositionalArgs } from 'ember-modifier';
import Modifier from 'ember-modifier';

interface <%= options.entity.pascalizedName %>Signature {
  Args: {
    Named: {};
    Positional: [];
  };
  Element: Element;
}

export default class <%= options.entity.pascalizedName %>Modifier extends Modifier<<%= options.entity.pascalizedName %>Signature> {
  modify(element: Element /*, positional: PositionalArgs<<%= options.entity.pascalizedName %>Signature>, named: NamedArgs<<%= options.entity.pascalizedName %>Signature> */) {
    console.log(element);
  }
}
