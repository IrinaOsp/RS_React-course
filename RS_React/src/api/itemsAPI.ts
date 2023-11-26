import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { baseURL, defaultItemsPerPage } from '../data/data';

type ItemsQueryParams = {
  search?: string;
  itemsPerPage?: number | string;
  offset?: number | string;
};

export const itemsAPI = createApi({
  reducerPath: 'itemsApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${baseURL}` }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (build) => ({
    getPokemonList: build.query({
      query: ({
        search = '',
        itemsPerPage = defaultItemsPerPage,
        offset = '0',
      }: ItemsQueryParams) => (search ? search : `?limit=${itemsPerPage}&offset=${offset}`),
    }),
    getPokemonDetails: build.query({
      query: (id: string) => `/${id}`,
    }),
  }),
});

export const {
  useGetPokemonListQuery,
  useGetPokemonDetailsQuery,
  util: { getRunningQueriesThunk },
} = itemsAPI;
export const { getPokemonList, getPokemonDetails } = itemsAPI.endpoints;
