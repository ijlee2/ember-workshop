import Helper from '@ember/component/helper';

type Named = {};
type Positional = [string];
type Return = string;

interface MyHelperClassSignature {
  Args: {
    Named: Named;
    Positional: Positional;
  };
  Return: Return;
}

export default class MyHelperClass extends Helper<MyHelperClassSignature> {
  compute(positional: Positional /*, named: Named*/): Return {
    return positional[0];
  }
}
