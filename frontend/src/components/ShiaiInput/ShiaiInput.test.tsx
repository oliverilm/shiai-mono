import React from 'react';

import { render } from 'tests';

import ShiaiInput from './ShiaiInput';

describe('ShiaiInput', () => {
  test('renders', () => {
    const { getByText } = render(<ShiaiInput />);

    const element = getByText('ShiaiInput');

    expect(element).toBeInTheDocument();
  });
});
