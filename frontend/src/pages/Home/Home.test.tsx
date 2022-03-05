import React from 'react';

import { render } from 'tests';

import Home from './Home';

describe('Home', () => {
  test('renders', () => {
    const { getByText } = render(<Home />);

    const element = getByText('Home');

    expect(element).toBeInTheDocument();
  });
});
