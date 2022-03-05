import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from './useRedux';
import { getCategoriesThunk } from '../redux/entities/actions';
import { ICategory } from '../@types/api-types';

const useCategories = (): ICategory[] => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((s) => s.entities);
  useEffect(() => {
    dispatch(getCategoriesThunk());
  }, [dispatch]);
  return categories;
};

export default useCategories;
