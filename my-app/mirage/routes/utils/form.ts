import { Response, type Server } from 'miragejs';

export function mockForm(server: Server): void {
  server.post('/contact-me', () => {
    return new Response(200);
  });
}
