import type Owner from '@ember/owner';
import { setOwner } from '@ember/owner';
import { type Registry as Services, service } from '@ember/service';

export class ContactMe {
  @service declare experiments: Services['experiments'];

  get showSubscribe(): boolean {
    return this.experiments.getVariant('subscribe-to-ember-times') === 'v1';
  }

  constructor(owner: Owner) {
    setOwner(this, owner);
  }
}
