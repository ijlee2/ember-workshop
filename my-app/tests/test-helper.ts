import { setApplication } from '@ember/test-helpers';
import { setupEmberOnerrorValidation, start as qunitStart } from 'ember-qunit';
import Application from 'my-app/app';
import config from 'my-app/config/environment';
import QUnit from 'qunit';
import { setup } from 'qunit-dom';
import { restore } from 'sinon';

export function start() {
  setApplication(Application.create(config.APP));

  setup(QUnit.assert);
  setupEmberOnerrorValidation();
  qunitStart();

  QUnit.testDone(function () {
    restore();
  });
}
