import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IPaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
}

const initialState: IPaginationState = {
  currentPage: 1,
  itemsPerPage: 8,
  totalPages: Math.ceil(1292 / 8),
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    increment: (state) => {
      state.currentPage += 1;
    },
    decrement: (state) => {
      state.currentPage -= 1;
    },
    setToNumber: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const { increment, decrement, setToNumber } = paginationSlice.actions;

export default paginationSlice.reducer;
