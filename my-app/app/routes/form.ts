import type Owner from '@ember/owner';
import Route from '@ember/routing/route';
import { type Registry as Services, service } from '@ember/service';

export default class FormRoute extends Route {
  @service declare experiments: Services['experiments'];

  constructor(owner: Owner) {
    super(owner);

    this.experiments.decideVariant('subscribe-to-ember-times');
  }
}
