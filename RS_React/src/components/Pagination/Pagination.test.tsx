import { expect, describe, it } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Pagination from './Pagination';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../state/store';

describe('Pagination', () => {
  it('updates URL query parameter when page changes', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Pagination />
        </BrowserRouter>
      </Provider>
    );

    const nextButtonElement = screen.getByRole('button', { name: /next/i });
    await waitFor(() => {
      fireEvent.click(nextButtonElement);
      expect(window.location.search).toBe('?page=2&page_size=8');
    });
  });
});
