import React from 'react';

import { render } from 'tests';

import ShiaiIcon from './ShiaiIcon';

describe('ShiaiIcon', () => {
  test('renders', () => {
    const { getByText } = render(<ShiaiIcon />);

    const element = getByText('ShiaiIcon');

    expect(element).toBeInTheDocument();
  });
});
