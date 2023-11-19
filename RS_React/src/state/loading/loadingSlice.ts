import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ILoadingState {
  isCardLoading: boolean;
  isDetailedCardLoading: boolean;
}

const initialState: ILoadingState = {
  isCardLoading: false,
  isDetailedCardLoading: false,
};

const isLoadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setIsLoading: (
      state,
      action: PayloadAction<{ key: 'isCardLoading' | 'isDetailedCardLoading'; value: boolean }>
    ) => {
      state[action.payload.key] = action.payload.value;
    },
  },
});

export const { setIsLoading } = isLoadingSlice.actions;

export default isLoadingSlice.reducer;
