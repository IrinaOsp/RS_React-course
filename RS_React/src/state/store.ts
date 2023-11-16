import { configureStore } from '@reduxjs/toolkit';
import paginationReducer from './pagination/paginationSlice';
import searchReducer from './search/searchSlice';
// import itemsReducer from './items/itemsSlice';

export const store = configureStore({
  reducer: {
    pagination: paginationReducer,
    search: searchReducer,
    // items: itemsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
