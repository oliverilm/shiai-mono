import React from 'react';

import { render } from 'tests';

import Results from './Results';

describe('Results', () => {
  test('renders', () => {
    const { getByText } = render(<Results />);

    const element = getByText('Results');

    expect(element).toBeInTheDocument();
  });
});
