import Helper from '@ember/component/helper';

interface <%= options.entity.pascalizedName %>Signature {
  Args: {
    Named: {};
    Positional: [string];
  };
  Return: string;
}

export default class <%= options.entity.pascalizedName %>Helper extends Helper<<%= options.entity.pascalizedName %>Signature> {
  compute(positional: <%= options.entity.pascalizedName %>Signature['Args']['Positional'] /*, named: <%= options.entity.pascalizedName %>Signature['Args']['Named']*/): <%= options.entity.pascalizedName %>Signature['Return'] {
    return positional[0];
  }
}
