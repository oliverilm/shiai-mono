import React from 'react';

import { render } from 'tests';

import LandingPage from './LandingPage';

describe('LandingPage', () => {
  test('renders', () => {
    const { getByText } = render(<LandingPage />);

    const element = getByText('LandingPage');

    expect(element).toBeInTheDocument();
  });
});
