import { renderHook } from '@testing-library/react-hooks';

import useBreakpoints from './useBreakpoints';

describe('useBreakpoints', () => {
  test('returns a value', async () => {
    const { result } = renderHook(() => useBreakpoints());

    expect(result.current).toEqual('1');
  });
});
