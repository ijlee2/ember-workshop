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

export interface AutofocusSignature {
  Args: {};
  Element: HTMLElement;
}

export default class AutofocusModifier extends Modifier<AutofocusSignature> {
  modify(element: AutofocusSignature['Element']) {
    const childElement = element.querySelector(SELECTOR_FOR_EDITABLE_ELEMENT);

    if (childElement) {
      (childElement as HTMLElement).focus();
      return;
    }

    element.focus();
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    autofocus: typeof AutofocusModifier;
  }
}
