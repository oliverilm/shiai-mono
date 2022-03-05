import { renderHook } from '@testing-library/react-hooks';

import useToast from './useToast';

describe('useToast', () => {
  test('returns a value', async () => {
    const { result } = renderHook(() => useToast());

    expect(result.current).toEqual('1');
  });
});
