import { join } from 'node:path';

import { getFilePath } from '@codemod-utils/blueprints';

export const blueprintsRoot = join(
  getFilePath(import.meta.url),
  '../../blueprints',
);
