import React from 'react';

import { render } from 'tests';

import About from './About';

describe('About', () => {
  test('renders', () => {
    const { getByText } = render(<About />);

    const element = getByText('About');

    expect(element).toBeInTheDocument();
  });
});
