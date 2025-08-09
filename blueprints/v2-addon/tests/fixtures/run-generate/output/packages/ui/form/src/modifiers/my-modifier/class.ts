import type { NamedArgs, PositionalArgs } from 'ember-modifier';
import Modifier from 'ember-modifier';

interface MyModifierClassSignature {
  Args: {
    Named: {};
    Positional: [];
  };
  Element: Element;
}

export default class MyModifierClassModifier extends Modifier<MyModifierClassSignature> {
  modify(element: Element /*, positional: PositionalArgs<MyModifierClassSignature>, named: NamedArgs<MyModifierClassSignature> */) {
    console.log(element);
  }
}
