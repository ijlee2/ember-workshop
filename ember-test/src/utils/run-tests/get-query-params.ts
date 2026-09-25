import type { Options } from '../../types/index.js';

export function getQueryParams(filters: Options['filters']): string {
  const params: string[] = [];

  if (filters.module) {
    params.push(`module=${filters.module}`);
  }

  if (filters.filter) {
    params.push(`filter=${filters.filter}`);
  }

  return params.join('&');
}
