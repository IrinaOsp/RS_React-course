import { expect, describe, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import SearchResults from './SearchResults';
import { SearchContext, ISearchContext } from '../../context/Context';
import { baseURL } from '../../data/data';
import { ISearchResponseItem, TypeSearchResponse } from '../../types/types';
import { BrowserRouter } from 'react-router-dom';
import '../../mocks/server';

const MockSearchResults = () => {
  return (
    <BrowserRouter>
      <SearchResults />
    </BrowserRouter>
  );
};

describe('SearchResults', async () => {
  it('renders the specified number of cards', async () => {
    const context: ISearchContext = {
      searchText: '',
      updateSearchText: () => {},
      currentPageNumber: 2,
      updateCurrentPageNumber: () => {},
      itemsPerPage: 4,
      updateItemsPerPage: () => {},
      queryResponse: null,
      updateQueryResponse: (queryResponse: TypeSearchResponse) => {
        context.queryResponse = queryResponse;
      },
      dataToRenderCard: [],
      updateDataToRenderCard: (dataToRenderCard: ISearchResponseItem[]) => {
        context.dataToRenderCard = dataToRenderCard;
      },
    };

    const offset = context.currentPageNumber * context.itemsPerPage;
    const fetchData = async () => {
      const response = await fetch(
        `${baseURL}?limit=${context.itemsPerPage}&offset=${offset}`
      ).then((res) => res.json() as Promise<TypeSearchResponse>);
      context.updateQueryResponse(response);

      // const fetchItem = async (id: string) => {
      //   return await fetch(`${baseURL}${id}`).then(
      //     (res) => res.json() as Promise<ISearchResponseItem>
      //   );
      // };
      // const resDataToRenderItem1 = await fetchItem('1');
      // const resDataToRenderItem2 = await fetchItem('2');
      // const resDataToRenderItem3 = await fetchItem('3');
      // const resDataToRenderItem4 = await fetchItem('4');
      // context.updateDataToRenderCard([
      //   resDataToRenderItem1,
      //   resDataToRenderItem2,
      //   resDataToRenderItem3,
      //   resDataToRenderItem4,
      // ]);
    };

    await waitFor(fetchData, { timeout: 7000 }).then(() => {});
    render(
      <SearchContext.Provider value={context}>
        <MockSearchResults />
      </SearchContext.Provider>
    );

    const length =
      context.queryResponse && 'results' in context.queryResponse
        ? context.queryResponse.results.length
        : 0;
    expect(await screen.findAllByText(/id/i)).toHaveLength(length);
  });

  it('displays message if no cards are present', async () => {
    const context: ISearchContext = {
      searchText: '',
      updateSearchText: () => {},
      currentPageNumber: 1,
      updateCurrentPageNumber: () => {},
      itemsPerPage: 4,
      updateItemsPerPage: () => {},
      queryResponse: {
        count: 0,
        results: [],
      },
      updateQueryResponse: () => {},
      dataToRenderCard: [],
      updateDataToRenderCard: (dataToRenderCard: ISearchResponseItem[]) => {
        context.dataToRenderCard = dataToRenderCard;
      },
    };

    render(
      <SearchContext.Provider value={context}>
        <SearchResults />
      </SearchContext.Provider>
    );

    await waitFor(() => {
      const noResultsMessage = screen.getByText('No search results');
      expect(noResultsMessage).toBeInTheDocument();
    });
  });
});
