import { helper } from '@ember/component/helper';

interface <%= options.entity.pascalizedName %>Signature {
  Args: {
    Named: {};
    Positional: [string];
  };
  Return: string;
}

export default helper<<%= options.entity.pascalizedName %>Signature>(
  function <%= options.entity.camelizedName %>(positional /*, named*/) {
    return positional[0];
  },
);
