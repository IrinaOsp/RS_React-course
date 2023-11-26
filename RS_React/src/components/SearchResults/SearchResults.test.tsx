import { expect, describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import SearchResults from './SearchResults';
import '../../mocks/server';
import { Provider } from 'react-redux';
import { store } from '../../state/store';
import { mockCardList } from '../../mocks/handlers';

const MockSearchResults = () => {
  return (
    <Provider store={store}>
      <SearchResults data={mockCardList} />
    </Provider>
  );
};

describe('SearchResults', async () => {
  it('renders the specified number of cards', async () => {
    render(<MockSearchResults />);

    expect(await screen.findAllByText(/id/i)).toHaveLength(4);
  });
});
