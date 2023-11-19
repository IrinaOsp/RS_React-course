import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ISearchState {
  searchText: string;
}

const initialState: ISearchState = {
  searchText: 'noSuchResult',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    updateSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
  },
});

export const { updateSearchText } = searchSlice.actions;

export default searchSlice.reducer;
