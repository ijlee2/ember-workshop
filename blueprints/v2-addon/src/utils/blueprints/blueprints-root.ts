import { join } from 'node:path';

import { getFilePath } from '@codemod-utils/blueprints';

const fileURL = import.meta.url;

export const blueprintsRoot = join(getFilePath(fileURL), '../../blueprints');
