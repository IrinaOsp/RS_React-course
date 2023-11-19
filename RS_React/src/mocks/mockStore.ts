import { configureStore } from '@reduxjs/toolkit';
import { itemsAPI } from '../api/itemsAPI';
import mockSearchSlice from './mockSearchSlice';
import mockPaginationSlice from './mockPaginationSlice';

export const mockStore = configureStore({
  reducer: {
    pagination: mockPaginationSlice,
    search: mockSearchSlice,
    [itemsAPI.reducerPath]: itemsAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(itemsAPI.middleware),
});

export type RootState = ReturnType<typeof mockStore.getState>;
export type AppDispatch = typeof mockStore.dispatch;
