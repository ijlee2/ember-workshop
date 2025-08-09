import { helper } from '@ember/component/helper';

interface MyHelperFunctionSignature {
  Args: {
    Named: {};
    Positional: [string];
  };
  Return: string;
}

export default helper<MyHelperFunctionSignature>(
  function myHelperFunction(positional /*, named*/) {
    return positional[0];
  },
);
