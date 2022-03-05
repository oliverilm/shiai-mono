import { createSlice } from '@reduxjs/toolkit';

import { CountryI, IBelt, ICategory } from '../../@types/api-types';
import {
  getBeltsThunk,
  getCategoriesThunk,
  getCountriesThunk,
} from './actions';

export interface StateReducerI {
  countries: CountryI[];
  belts: IBelt[];
  categories: ICategory[];
}

const initialState: StateReducerI = {
  countries: [],
  belts: [],
  categories: [],
};

export const entitySlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCountriesThunk.fulfilled, (state, action) => {
        state.countries = action.payload;
      })
      .addCase(getBeltsThunk.fulfilled, (state, action) => {
        state.belts = action.payload;
      })
      .addCase(getCategoriesThunk.fulfilled, (s, a) => {
        s.categories = a.payload;
      });
  },
});

export default entitySlice.reducer;
