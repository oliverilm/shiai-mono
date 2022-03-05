import { useEffect, useState } from 'react';

import useCategories from './useCategories';

interface ReturnProps {
  value: {
    startingYear: number;
    endingYear: number;
  };
  setStartingYear: (n: number) => void;
  setEndingYear: (n: number) => void;
}

const useCategoryAgeRange = (
  categoryId: number,
  defaultStart?: number,
  defaultEnd?: number,
): ReturnProps => {
  const categories = useCategories();
  const [value, setValue] = useState({
    startingYear: defaultStart ?? 0,
    endingYear: defaultEnd ?? 0,
  });

  const setStartingYear = (year: number) => {
    setValue((prev) => ({ ...prev, startingYear: year }));
  };
  const setEndingYear = (year: number) => {
    setValue((prev) => ({ ...prev, endingYear: year }));
  };

  useEffect(() => {
    const accordingCat = categories.find((ca) => ca.id === categoryId);

    if (
      accordingCat &&
      defaultStart === undefined &&
      defaultEnd === undefined
    ) {
      // calculate start or end
      const start =
        new Date().getFullYear() - Number(accordingCat.value.split('U')[1]);
      const end = start - 2;

      setValue({
        startingYear: start,
        endingYear: end,
      });
    }
    setValue({
      startingYear: 2009,
      endingYear: 2011,
    });
  }, [defaultStart, defaultEnd, categories, categoryId]);

  return { value, setStartingYear, setEndingYear };
};
export default useCategoryAgeRange;
