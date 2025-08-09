import { action } from '@ember/object';
import { trackedObject } from '@ember/reactive/collections';

export class UiForm {
  data = trackedObject<Record<string, unknown>>({
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
