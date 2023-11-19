import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseURL, defaultItemsPerPage } from '../data/data';

type ItemsQueryParams = {
  search?: string;
  itemsPerPage?: number | string;
  offset?: number | string;
};

export const itemsAPI = createApi({
  reducerPath: 'itemsApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${baseURL}` }),
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

export const { useGetPokemonListQuery, useGetPokemonDetailsQuery } = itemsAPI;
