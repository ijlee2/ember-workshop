import { modifier } from 'ember-modifier';

const focusableElements = [
  'div[tabindex="0"]',
  'input',
  'select',
  'span[tabindex="0"]',
  'textarea',
];

const isEditable = [
  ':not([aria-disabled="true"])',
  ':not([aria-readonly="true"])',
  ':not([disabled])',
  ':not([readonly])',
].join('');

const SELECTOR_FOR_EDITABLE_ELEMENT = focusableElements
  .map((element) => `${element}${isEditable}`)
  .join(',');

interface AutofocusSignature {
  Args: {};
  Element: HTMLElement;
}

const AutofocusModifier = modifier<AutofocusSignature>((element) => {
  const childElement = element.querySelector(SELECTOR_FOR_EDITABLE_ELEMENT);

  if (childElement) {
    (childElement as HTMLElement).focus();
    return;
  }

  element.focus();
});

export default AutofocusModifier;
