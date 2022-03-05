import React from 'react';

import { render } from 'tests';

import BottomNav from './BottomNav';

describe('BottomNav', () => {
  test('renders', () => {
    const { getByText } = render(<BottomNav />);

    const element = getByText('BottomNav');

    expect(element).toBeInTheDocument();
  });
});
