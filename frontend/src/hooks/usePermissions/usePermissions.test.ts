import { renderHook } from '@testing-library/react-hooks';

import usePermissions from './usePermissions';

describe('usePermissions', () => {
  test('returns a value', async () => {
    const { result } = renderHook(() => usePermissions());

    expect(result.current).toEqual('1');
  });
});
