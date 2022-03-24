import Modifier from 'ember-modifier';

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

export default class AutofocusModifier extends Modifier {
  modify(element) {
    const childElement = element.querySelector(SELECTOR_FOR_EDITABLE_ELEMENT);

    if (childElement) {
      childElement.focus();
      return;
    }

    element.focus();
  }
}
