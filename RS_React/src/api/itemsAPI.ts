import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseURL, defaultItemsPerPage } from '../data/data';

type ItemsQueryParams = {
  itemsPerPage?: number | string;
  offset?: number | string;
};

export const itemsAPI = createApi({
  reducerPath: 'itemsApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${baseURL}` }),
  endpoints: (build) => ({
    getPokemonList: build.query({
      query: ({ itemsPerPage = defaultItemsPerPage, offset = '0' }: ItemsQueryParams) =>
        `?limit=${itemsPerPage}&offset=${offset}`,
    }),
    getPokemonDetails: build.query({
      query: (id: string) => `/${id}`,
    }),
  }),
});

export const { useGetPokemonListQuery, useGetPokemonDetailsQuery } = itemsAPI;
