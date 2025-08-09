import Helper from '@ember/component/helper';

interface MyHelperClassSignature {
  Args: {
    Named: {};
    Positional: [string];
  };
  Return: string;
}

export default class MyHelperClassHelper extends Helper<MyHelperClassSignature> {
  compute(positional: MyHelperClassSignature['Args']['Positional'] /*, named: MyHelperClassSignature['Args']['Named']*/): MyHelperClassSignature['Return'] {
    return positional[0];
  }
}
