import { modifier } from 'ember-modifier';

interface MyModifierFunctionSignature {
  Args: {
    Named: {};
    Positional: [];
  };
  Element: Element;
}

export default modifier<MyModifierFunctionSignature>(
  function myModifierFunction(element /*, positional, named*/) {
    console.log(element);
  },
);
