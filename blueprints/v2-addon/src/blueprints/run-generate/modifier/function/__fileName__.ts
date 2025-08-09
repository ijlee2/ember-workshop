import { modifier } from 'ember-modifier';

interface <%= options.entity.pascalizedName %>Signature {
  Args: {
    Named: {};
    Positional: [];
  };
  Element: Element;
}

export default modifier<<%= options.entity.pascalizedName %>Signature>(
  function <%= options.entity.camelizedName %>(element /*, positional, named*/) {
    console.log(element);
  },
);
