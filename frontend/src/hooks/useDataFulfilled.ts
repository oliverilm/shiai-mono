import { useEffect, useState } from 'react';

const useDataFulfilled = (values: Record<string, string>): boolean => {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    setOk(Object.values(values).filter((v) => v.length === 0).length === 0);
  }, [values]);

  return !ok;
};

export default useDataFulfilled;
