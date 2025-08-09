import { modifier } from 'ember-modifier';

type Named = {};
type Positional = [];

interface MyModifierFunctionSignature {
  Args: {
    Named: Named;
    Positional: Positional;
  };
  Element: Element;
}

export default modifier<MyModifierFunctionSignature>(
  function myModifierFunction(element /*, positional, named*/) {
    console.log(element);
  },
);
