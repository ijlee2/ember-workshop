import Service from '@ember/service';
import { waitForPromise } from '@ember/test-waiters';

import {
  type Data,
  normalize,
  type ResourceObject,
  serialize,
} from '../utils/services/api';

type RequestOptions =
  | {
      body: null;
      method: 'GET';
    }
  | {
      body: string;
      method: 'POST';
    };

export default class ApiService extends Service {
  async get<T>(endpoint: string): Promise<T> {
    const { data } = (await this.request<T>(endpoint, {
      body: null,
      method: 'GET',
    })) as { data?: ResourceObject | ResourceObject[] };

    if (data === undefined) {
      throw new Error(`Undefined data (GET ${endpoint})`);
    }

    if (Array.isArray(data)) {
      return data.map(({ attributes, id }) => {
        return {
          ...normalize(attributes),
          id,
        };
      }) as T;
    }

    return {
      ...normalize(data.attributes),
      id: data.id,
    } as T;
  }

  async post<T>(
    endpoint: string,
    options: { data: Data; type: string },
  ): Promise<T> {
    const body = JSON.stringify({
      data: {
        attributes: serialize(options.data),
        type: options.type,
      },
    });

    const response = await this.request<T>(endpoint, {
      body,
      method: 'POST',
    });

    return response;
  }

  private async request<T>(
    endpoint: string,
    requestOptions: RequestOptions,
  ): Promise<T> {
    const response = await waitForPromise(
      fetch(endpoint, {
        body: requestOptions.body,
        headers: {
          'Content-Type': 'application/vnd.api+json',
        },
        method: requestOptions.method,
      }),
    );

    const json = await response.json();

    return json as T;
  }
}

// Don't remove this declaration: this is what enables TypeScript to resolve
// this service using `Owner.lookup('service:api')`, as well
// as to check when you pass the service name as an argument to the decorator,
// like `@service('api') declare altName: ApiService;`.
declare module '@ember/service' {
  interface Registry {
    api: ApiService;
  }
}
