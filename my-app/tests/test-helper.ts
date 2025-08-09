import { setApplication } from '@ember/test-helpers';
import { setupEmberOnerrorValidation, start as qunitStart } from 'ember-qunit';
import Application from 'my-app/app';
import config from 'my-app/config/environment';
import QUnit from 'qunit';
import { setup } from 'qunit-dom';
import { restore } from 'sinon';

QUnit.config.urlConfig.push({
  id: 'mirageLogging',
  label: 'Mirage logging',
});

export interface ExtendedQUnitConfig extends Config {
  mirageLogging: boolean;
}

export function start(): void {
  setApplication(Application.create(config.APP));

  setup(QUnit.assert);
  setupEmberOnerrorValidation();
  qunitStart();

  QUnit.testDone(function () {
    restore();
  });
}
