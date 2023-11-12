import { SetURLSearchParams } from 'react-router-dom';

export type TypeSearchResponse = ISearchResponseItem | ISearchResponseArray | null | '';

export interface ISearchResponseItem {
  height: number;
  id: number;
  name: string;
  sprites: { front_default: string };
  weight: number;
}
export interface ISearchResponseItemDetailed extends ISearchResponseItem {
  abilities: [{ ability: { name: string } }];
  base_experience: number;
  held_items: [{ item: { name: string } }];
  sprites: {
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
}

export interface ISearchResponseArray {
  count: number;
  results: TypeSearchResponseArray;
}

export type TypeSearchResponseArray = ISearchArrayItem[];

export interface ISearchArrayItem {
  name: string;
  url: string;
}

export interface ISearchFormProps {
  updateSearchData: (data: TypeSearchResponse) => void;
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
}

export interface ISearchResultsProps {
  data: TypeSearchResponse;
}

export interface IPaginationProps {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  count: number;
}

export interface ErrorBoundaryState {
  hasError: boolean;
}
