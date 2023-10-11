// Types for compiled templates
declare module 'ember-page-title/test-support' {
  const getPageTitle: () => string;

  export { getPageTitle };
}

declare module 'my-app/templates/*' {
  import type { TemplateFactory } from 'ember-cli-htmlbars';

  const tmpl: TemplateFactory;

  export default tmpl;
}
