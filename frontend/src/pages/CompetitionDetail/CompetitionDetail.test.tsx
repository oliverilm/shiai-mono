import React from 'react';

import { render } from 'tests';

import CompetitionDetail from './CompetitionDetail';

describe('CompetitionDetail', () => {
  test('renders', () => {
    const { getByText } = render(<CompetitionDetail />);

    const element = getByText('CompetitionDetail');

    expect(element).toBeInTheDocument();
  });
});
