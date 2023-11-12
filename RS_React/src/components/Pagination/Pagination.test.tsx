import { expect, describe, it } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Pagination from './Pagination';
import { BrowserRouter } from 'react-router-dom';
import { SearchContext } from '../../context/Context';

describe('Pagination', () => {
  it('updates URL query parameter when page changes', async () => {
    render(
      <BrowserRouter>
        <SearchContext.Provider
          value={{
            searchText: '',
            updateSearchText: () => {},
            currentPageNumber: 1,
            updateCurrentPageNumber: () => {},
            itemsPerPage: 10,
            updateItemsPerPage: () => {},
            queryResponse: { count: 100, results: [] },
            updateQueryResponse: () => {},
            dataToRenderCard: [],
            updateDataToRenderCard: () => {},
          }}
        >
          <Pagination />
        </SearchContext.Provider>
      </BrowserRouter>
    );

    const nextButtonElement = screen.getByRole('button', { name: /next/i });
    await waitFor(() => {
      fireEvent.click(nextButtonElement);
      expect(window.location.search).toBe('?page=2&page_size=10');
    });
  });
});
