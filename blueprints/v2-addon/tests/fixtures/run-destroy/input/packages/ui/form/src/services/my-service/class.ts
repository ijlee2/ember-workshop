import Service from '@ember/service';

export default class MyServiceClassService extends Service {}

declare module '@ember/service' {
  interface Registry {
    'my-service/class': MyServiceClassService;
  }
}
