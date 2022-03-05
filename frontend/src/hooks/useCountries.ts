import { useEffect } from 'react';

import { CountryI } from '../@types/api-types';
import { useAppDispatch, useAppSelector } from './useRedux';
import { getCountriesThunk } from '../redux/entities/actions';

const useCountries = (): CountryI[] => {
  const { countries } = useAppSelector((s) => s.entities);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCountriesThunk());
  }, [dispatch]);

  return countries;
};

export default useCountries;
