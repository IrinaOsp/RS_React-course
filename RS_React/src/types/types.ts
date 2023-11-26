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

export interface ISearchResultsProps {
  data: TypeSearchResponse;
}

export interface ErrorBoundaryState {
  hasError: boolean;
}
