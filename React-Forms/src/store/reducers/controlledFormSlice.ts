import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IFormState, TypeInfoPayload, TypeFormItems } from '../../types/types';

const initialState: IFormState = {
  name: '',
  age: 0,
  email: '',
  password: '',
  gender: 'Other',
  acceptanceTC: false,
  picture: {},
  country: '',
};

const controlledFormSlice = createSlice({
  name: 'controlledForm',
  initialState,
  reducers: {
    setInfo: (state: IFormState, action: PayloadAction<TypeInfoPayload>) => {
      (state[action.payload.key] as IFormState[TypeFormItems]) = action.payload.value;
    },
  },
});

export const { setInfo } = controlledFormSlice.actions;
export default controlledFormSlice.reducer;
