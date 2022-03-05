import { useEffect } from 'react';

import { IBelt } from '../@types/api-types';
import { useAppDispatch, useAppSelector } from './useRedux';
import { getBeltsThunk } from '../redux/entities/actions';

const useBelts = (): IBelt[] => {
  const dispatch = useAppDispatch();
  const { belts } = useAppSelector((s) => s.entities);
  useEffect(() => {
    dispatch(getBeltsThunk());
  }, [dispatch]);

  return belts;
};

export default useBelts;
