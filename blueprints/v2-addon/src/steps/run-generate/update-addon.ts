import type { Options } from '../../types/run-generate.js';
import {
  createEntity,
  updateBarrelFile,
  updateTemplateRegistry,
} from './update-addon/index.js';

export function updateAddon(options: Options): void {
  createEntity(options);
  updateBarrelFile(options);
  updateTemplateRegistry(options);
}
