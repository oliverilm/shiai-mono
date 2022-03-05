import React from 'react';

import { render } from 'tests';

import NavBar from './NavBar';

describe('NavBar', () => {
  test('renders', () => {
    const { getByText } = render(<NavBar />);

    const element = getByText('NavBar');

    expect(element).toBeInTheDocument();
  });
});
