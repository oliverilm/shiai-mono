import { createAsyncThunk } from '@reduxjs/toolkit';

import API from '../../API';
import {
  ICategoryInCompetition,
  ICompetition,
  ICreateCategoryInCompetition,
} from '../../@types/api-types';

export const fetchCompetitionsThunk = createAsyncThunk(
  'competitions/fetchAll',
  async () => {
    const result = await API.competition.list();
    return result.data;
  },
);

export const fetchWeightCategoriesInCompetitionThunk = createAsyncThunk(
  'competitions/getWeightCategories',
  async ({
    competition,
  }: {
    competition: ICompetition;
  }): Promise<Record<string, ICategoryInCompetition[]>> => {
    const res = await API.competition.getRegisteredCategories(competition.slug);
    const cats = res.data;
    return { [competition.slug]: cats };
  },
);

export const addWeightCategoryToCompetition = createAsyncThunk(
  'addWeightCat',
  async (
    {
      category,
      competition,
    }: { competition: ICompetition; category: ICreateCategoryInCompetition },
    { dispatch },
  ) => {
    await API.competition.addCategory(category, competition.slug);

    dispatch(fetchWeightCategoriesInCompetitionThunk({ competition }));
  },
);

export const getCompetitionJudokasThunk = createAsyncThunk(
  'getCompetitionJudokas',
  async ({ slug }: { slug: string }) => {
    const res = await API.competition.getCompetitionJudokas(slug);
    return { [slug]: res.data };
  },
);
