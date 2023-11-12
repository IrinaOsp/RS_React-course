import { setupServer } from 'msw/node';
import { handlers } from './handlers';
import { afterAll, afterEach, beforeAll } from 'vitest';
import '@testing-library/jest-dom/vitest';

const server = setupServer(...handlers);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

export default server;
