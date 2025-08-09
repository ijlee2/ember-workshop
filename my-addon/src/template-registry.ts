import type NavigationMenuComponent from './components/navigation-menu.gts';
import type UiFormComponent from './components/ui/form.gts';
import type UiFormCheckboxComponent from './components/ui/form/checkbox.gts';
import type UiFormFieldComponent from './components/ui/form/field.gts';
import type UiFormInformationComponent from './components/ui/form/information.gts';
import type UiFormInputComponent from './components/ui/form/input.gts';
import type UiFormNumberComponent from './components/ui/form/number.gts';
import type UiFormSelectComponent from './components/ui/form/select.gts';
import type UiFormTextareaComponent from './components/ui/form/textarea.gts';
import type UiPageComponent from './components/ui/page.gts';
import type AutofocusModifier from './modifiers/autofocus.ts';

export default interface MyAddonRegistry {
  NavigationMenu: typeof NavigationMenuComponent;
  'Ui::Form': typeof UiFormComponent;
  'Ui::Form::Checkbox': typeof UiFormCheckboxComponent;
  'Ui::Form::Field': typeof UiFormFieldComponent;
  'Ui::Form::Information': typeof UiFormInformationComponent;
  'Ui::Form::Input': typeof UiFormInputComponent;
  'Ui::Form::Number': typeof UiFormNumberComponent;
  'Ui::Form::Select': typeof UiFormSelectComponent;
  'Ui::Form::Textarea': typeof UiFormTextareaComponent;
  'Ui::Page': typeof UiPageComponent;
  autofocus: typeof AutofocusModifier;
  'navigation-menu': typeof NavigationMenuComponent;
  'ui/form': typeof UiFormComponent;
  'ui/form/checkbox': typeof UiFormCheckboxComponent;
  'ui/form/field': typeof UiFormFieldComponent;
  'ui/form/information': typeof UiFormInformationComponent;
  'ui/form/input': typeof UiFormInputComponent;
  'ui/form/number': typeof UiFormNumberComponent;
  'ui/form/select': typeof UiFormSelectComponent;
  'ui/form/textarea': typeof UiFormTextareaComponent;
  'ui/page': typeof UiPageComponent;
}
