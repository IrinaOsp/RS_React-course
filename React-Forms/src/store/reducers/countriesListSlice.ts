import { createSlice } from '@reduxjs/toolkit';
import countriesList from '../../data/countries';

const countriesListSlice = createSlice({
  name: 'countriesList',
  initialState: countriesList,
  reducers: {},
});

export default countriesListSlice.reducer;
