import React from 'react';

import { render } from 'tests';

import CreateCompetition from './CreateCompetition';

describe('CreateCompetition', () => {
  test('renders', () => {
    const { getByText } = render(<CreateCompetition />);

    const element = getByText('CreateCompetition');

    expect(element).toBeInTheDocument();
  });
});
