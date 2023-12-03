import { combineReducers, configureStore } from '@reduxjs/toolkit';
import countriesListSlice from './reducers/countriesListSlice';
import uncontrolledFormSlice from './reducers/uncontrolledFormSlice';
import controlledFormSlice from './reducers/controlledFormSlice';

const rootReducer = combineReducers({
  countriesListSlice,
  uncontrolledFormSlice,
  controlledFormSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
