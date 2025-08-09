import { action } from '@ember/object';
import { TrackedObject } from 'tracked-built-ins';

export class UiForm {
  data = new TrackedObject<Record<string, unknown>>({
    donation: 1000,
    email: 'zoey@emberjs.com',
    message: 'I 🧡 container queries!',
    name: 'Zoey',
    sortBy: 'name:asc',
    subscribe: true,
  });

  @action updateData({ key, value }: { key: string; value: unknown }): void {
    this.data[key] = value;
  }
}
