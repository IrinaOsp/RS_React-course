import { createContext, useState } from 'react';
import { defaultItemsPerPage } from '../data/data';
import { ISearchResponseItem, TypeSearchResponse } from '../types/types';

export interface ISearchContext {
  searchText: string | null;
  updateSearchText: (searchText: string) => void;
  currentPageNumber: number;
  updateCurrentPageNumber: (currentPageNumber: number) => void;
  itemsPerPage: number;
  updateItemsPerPage: (itemsPerPage: number) => void;
  queryResponse: TypeSearchResponse | ISearchResponseItem | null;
  updateQueryResponse: (queryResponse: TypeSearchResponse) => void;
  dataToRenderCard: ISearchResponseItem[];
  updateDataToRenderCard: (dataToRenderCard: ISearchResponseItem[]) => void;
}

export const SearchContext = createContext<ISearchContext>({
  searchText: '',
  updateSearchText: () => {},
  currentPageNumber: 1,
  updateCurrentPageNumber: () => {},
  itemsPerPage: defaultItemsPerPage,
  updateItemsPerPage: () => {},
  queryResponse: null,
  updateQueryResponse: () => {},
  dataToRenderCard: [],
  updateDataToRenderCard: () => {},
});

export const SearchState = ({ children }: { children: React.ReactNode }) => {
  const [searchText, setSearchText] = useState(localStorage.getItem('search') || '');
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);
  const [queryResponse, setQueryResponse] = useState<TypeSearchResponse | null>(null);
  const [dataToRenderCard, setDataToRenderCard] = useState<ISearchResponseItem[]>([]);

  const updateSearchText = (searchText: string) => setSearchText(searchText);
  const updateCurrentPageNumber = (currentPageNumber: number) =>
    setCurrentPageNumber(currentPageNumber);
  const updateItemsPerPage = (itemsPerPage: number) => setItemsPerPage(itemsPerPage);
  const updateQueryResponse = (queryResponse: TypeSearchResponse) =>
    setQueryResponse(queryResponse);
  const updateDataToRenderCard = (dataToRenderCard: ISearchResponseItem[]) =>
    setDataToRenderCard(dataToRenderCard);

  return (
    <SearchContext.Provider
      value={{
        searchText,
        updateSearchText,
        currentPageNumber,
        updateCurrentPageNumber,
        itemsPerPage,
        updateItemsPerPage,
        queryResponse,
        updateQueryResponse,
        dataToRenderCard,
        updateDataToRenderCard,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
