import Route from '@ember/routing/route';
import type { ModelFrom } from 'my-app/utils/routes';

export type Model = ModelFrom<FormRoute>;

export default class FormRoute extends Route {}
