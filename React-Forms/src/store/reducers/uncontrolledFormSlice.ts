import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ISliceState, TypeInfoPayload, TypeFormItems } from '../../types/types';

const initialState: ISliceState = {
  userName: '',
  age: 0,
  email: '',
  password: '',
  confirmPassword: '',
  gender: 'Other',
  acceptanceTC: false,
  picture: null,
  country: '',
};

const uncontrolledFormSlice = createSlice({
  name: 'uncontrolledForm',
  initialState,
  reducers: {
    setInfo: (state: ISliceState, action: PayloadAction<TypeInfoPayload>) => {
      (state[action.payload.key] as ISliceState[TypeFormItems]) = action.payload.value;
    },
  },
});

export const { setInfo } = uncontrolledFormSlice.actions;
export default uncontrolledFormSlice.reducer;
