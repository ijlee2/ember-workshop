import Service from '@ember/service';

export default class MyServiceClass extends Service {}

declare module '@ember/service' {
  interface Registry {
    'my-service/class': MyServiceClass;
  }
}
