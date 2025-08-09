import { helper } from '@ember/component/helper';

type Named = {};
type Positional = [string];
type Return = string;

interface MyHelperFunctionSignature {
  Args: {
    Named: Named;
    Positional: Positional;
  };
  Return: Return;
}

export default helper<MyHelperFunctionSignature>(
  function myHelperFunction(positional /*, named*/) {
    return positional[0];
  },
);
