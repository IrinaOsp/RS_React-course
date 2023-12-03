import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ISliceState, TypeSubmittedForm } from '../../types/types';

const initialState: TypeSubmittedForm = {
  submittedForms: [],
};

const controlledFormSlice = createSlice({
  name: 'controlledForm',
  initialState,
  reducers: {
    setForm: (state: TypeSubmittedForm, action: PayloadAction<ISliceState>) => {
      state.submittedForms.push(action.payload);
    },
  },
});

export const { setForm } = controlledFormSlice.actions;
export default controlledFormSlice.reducer;
