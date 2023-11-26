import { setupServer } from 'msw/node';
import { handlers } from './handlers';
import { afterAll, afterEach, beforeAll, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';

const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
  vi.mock('next/router', () => require('next-router-mock'));
});

afterEach(() => {
  server.resetHandlers();
  cleanup();
});

afterAll(() => server.close());

export default server;
