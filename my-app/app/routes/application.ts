import Route from '@ember/routing/route';
import { type Registry as Services, service } from '@ember/service';
import {
  importSync,
  isDevelopingApp,
  isTesting,
  macroCondition,
} from '@embroider/macros';
import translationsForEnUs from 'virtual:ember-intl/translations/en-us';

const isDevelopment = macroCondition(isDevelopingApp() && !isTesting())
  ? true
  : false;

const isProduction = macroCondition(!isDevelopingApp()) ? true : false;

export default class ApplicationRoute extends Route {
  @service declare intl: Services['intl'];

  beforeModel(): void {
    this.setupIntl();
    this.setupMirage();
  }

  private setupIntl(): void {
    this.intl.addTranslations('en-us', translationsForEnUs);
    this.intl.setLocale(['en-us']);
  }

  private setupMirage(): void {
    if (isDevelopment || isProduction) {
      // @ts-expect-error: Incorrect type
      const { default: createServer } = importSync(
        'my-app/mirage/servers/default',
      );

      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      createServer();
    }
  }
}
