function replacer(key, value) {
  if (typeof value === 'undefined') {
    return null;
  }

  return value;
}

export function generateBody(data = {}) {
  return JSON.stringify(data, replacer);
}
