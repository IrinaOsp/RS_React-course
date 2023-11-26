import { expect, describe, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Pagination from './Pagination';
import mockRouter from 'next-router-mock';
import { Provider } from 'react-redux';
import { store } from '../../state/store';

vi.mock('next/router', () => ({
  useRouter: () => ({
    pathname: '/',
    query: {},
    push: vi.fn().mockImplementation(async () => ({ success: true })),
  }),
  useDispatch: () => vi.fn(),
}));

const MockPagination = () => {
  return (
    <Provider store={store}>
      <Pagination />
    </Provider>
  );
};

describe('Pagination', () => {
  it('updates URL query parameter when page changes', async () => {
    render(<MockPagination />);

    const nextButtonElement = screen.getByRole('button', { name: /next/i });
    await waitFor(() => {
      fireEvent.click(nextButtonElement);
      expect(mockRouter.query.page).toBe('2');
      expect(mockRouter.query.page_size).toBe('8');
    });
  });
});
