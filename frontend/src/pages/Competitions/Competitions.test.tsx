import React from 'react';

import { render } from 'tests';

import Competitions from './Competitions';

describe('Competitions', () => {
  test('renders', () => {
    const { getByText } = render(<Competitions />);

    const element = getByText('Competitions');

    expect(element).toBeInTheDocument();
  });
});
