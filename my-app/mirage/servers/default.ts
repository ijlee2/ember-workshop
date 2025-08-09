import { createServer, type Server } from 'miragejs';

import { factories } from '../factories/default';
import { models } from '../models/default';
import { routes } from '../routes/default';
import { seeds } from '../seeds/default';
import { serializers } from '../serializers/default';

// https://miragejs.com/docs/getting-started/overview/
// https://www.ember-cli-mirage.com/docs/getting-started/overview
export default function (config = {}): Server {
  return createServer({
    ...config,
    factories,
    models,
    routes,
    seeds,
    serializers,
  });
}
