import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ISliceState, TypeSubmittedForm } from '../../types/types';

const initialState: TypeSubmittedForm = {
  submittedForms: [],
};

const uncontrolledFormSlice = createSlice({
  name: 'uncontrolledForm',
  initialState,
  reducers: {
    setForm: (state: TypeSubmittedForm, action: PayloadAction<ISliceState>) => {
      state.submittedForms.push(action.payload);
    },
  },
});

export const { setForm } = uncontrolledFormSlice.actions;
export default uncontrolledFormSlice.reducer;
