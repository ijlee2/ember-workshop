import Modifier from 'ember-modifier';

type Named = {};
type Positional = [];

interface MyModifierClassSignature {
  Args: {
    Named: Named;
    Positional: Positional;
  };
  Element: Element;
}

export default class MyModifierClass extends Modifier<MyModifierClassSignature> {
  modify(element: Element /*, positional: Positional, named: Named */) {
    console.log(element);
  }
}
