import { expect, describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import SearchResults from './SearchResults';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import '../../mocks/server';
import { Provider } from 'react-redux';
import { store } from '../../state/store';
import { mockStore } from '../../mocks/mockStore';

const MockSearchResults = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <SearchResults />
      </BrowserRouter>
    </Provider>
  );
};

describe('SearchResults', async () => {
  it('renders the specified number of cards', async () => {
    render(<MockSearchResults />);

    expect(await screen.findAllByText(/id/i)).toHaveLength(4);
  });

  it('displays message if no cards are present', async () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <SearchResults />
        </MemoryRouter>
      </Provider>
    );

    const noResultsMessage = await screen.findByText('No search results');
    expect(noResultsMessage).toBeInTheDocument();
  });
});
