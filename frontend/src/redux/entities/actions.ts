import { createAsyncThunk } from '@reduxjs/toolkit';

import API from '../../API';

export const getCountriesThunk = createAsyncThunk(
  'entities/getCountries',
  async () => {
    const res = await API.generic.getCountries();
    return res.data;
  },
);

export const getBeltsThunk = createAsyncThunk('entities/getBelts', async () => {
  const res = await API.generic.getBelts();
  return res.data;
});

export const getCategoriesThunk = createAsyncThunk(
  'entities/getCategories',
  async () => {
    const res = await API.generic.getCategories();
    return res.data;
  },
);
