export function generateErrorMessage({ options = {}, value, valueType }) {
  const { isRequired } = options;

  if (isRequired) {
    switch (valueType) {
      case 'boolean': {
        if (value === undefined || value === false) {
          return 'Please select the checkbox.';
        }

        break;
      }

      case 'number':
      case 'string': {
        if (value === undefined || value === '') {
          return 'Please provide a value.';
        }

        break;
      }
    }
  }

  return undefined;
}
