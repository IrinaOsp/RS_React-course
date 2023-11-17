import { configureStore } from '@reduxjs/toolkit';
import paginationReducer from './pagination/paginationSlice';
import searchReducer from './search/searchSlice';
import { itemsAPI } from '../api/itemsAPI';

export const store = configureStore({
  reducer: {
    pagination: paginationReducer,
    search: searchReducer,
    [itemsAPI.reducerPath]: itemsAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(itemsAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
