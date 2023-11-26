import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import paginationReducer from './pagination/paginationSlice';
import searchReducer from './search/searchSlice';
import loadingReducer from './loading/loadingSlice';
import { itemsAPI } from '../api/itemsAPI';

export const makeStore = () =>
  configureStore({
    reducer: {
      pagination: paginationReducer,
      search: searchReducer,
      loading: loadingReducer,
      [itemsAPI.reducerPath]: itemsAPI.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(itemsAPI.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
