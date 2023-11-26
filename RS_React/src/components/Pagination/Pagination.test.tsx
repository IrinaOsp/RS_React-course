import { expect, describe, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Pagination from './Pagination';
import mockRouter from 'next-router-mock';
import { Provider } from 'react-redux';
import { store } from '../../state/store';

vi.mock('next/router', () => require('next-router-mock'));

const MockPagination = () => {
  return (
    <Provider store={store}>
      <Pagination />
    </Provider>
  );
};

describe('Pagination', () => {
  it('updates URL query parameter when page changes', async () => {
    mockRouter.push('/');
    render(<MockPagination />);

    const nextButtonElement = screen.getByRole('button', { name: /next/i });
    await waitFor(() => {
      fireEvent.click(nextButtonElement);
      expect(mockRouter.query).toMatchObject({
        page: '2',
      });
    });
  });
});
