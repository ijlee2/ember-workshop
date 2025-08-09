import type MyModifierFunctionModifier from './modifiers/my-modifier/function.ts';
import type MyModifierClassModifier from './modifiers/my-modifier/class.ts';
import type MyHelperFunctionHelper from './helpers/my-helper/function.ts';
import type MyHelperClassHelper from './helpers/my-helper/class.ts';
import type MyComponentTemplateOnlyComponent from './components/my-component/template-only.gts';
import type MyComponentGlimmerComponent from './components/my-component/glimmer.gts';
export default interface MyOrgUiFormRegistry {
  'my-modifier/function': typeof MyModifierFunctionModifier;
  'my-modifier/class': typeof MyModifierClassModifier;
  'my-helper/function': typeof MyHelperFunctionHelper;
  'my-helper/class': typeof MyHelperClassHelper;
  'MyComponent::TemplateOnly': typeof MyComponentTemplateOnlyComponent;
  'my-component/template-only': typeof MyComponentTemplateOnlyComponent;
  'MyComponent::Glimmer': typeof MyComponentGlimmerComponent;
  'my-component/glimmer': typeof MyComponentGlimmerComponent;
}
