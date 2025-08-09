import type { Options } from '../../types/run-destroy.js';
import {
  removeEntity,
  updateBarrelFile,
  updateTemplateRegistry,
} from './update-addon/index.js';

export function updateAddon(options: Options): void {
  removeEntity(options);
  updateBarrelFile(options);
  updateTemplateRegistry(options);
}
