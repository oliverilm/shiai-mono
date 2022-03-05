import React from 'react';

import { render } from 'tests';

import NavDrawer from './NavDrawer';

describe('NavDrawer', () => {
  test('renders', () => {
    const { getByText } = render(<NavDrawer />);

    const element = getByText('NavDrawer');

    expect(element).toBeInTheDocument();
  });
});
