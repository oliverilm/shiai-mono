import React from 'react';

import { render } from 'tests';

import CompetitionMainDetail from './CompetitionMainDetail';

describe('CompetitionMainDetail', () => {
  test('renders', () => {
    const { getByText } = render(<CompetitionMainDetail />);

    const element = getByText('CompetitionMainDetail');

    expect(element).toBeInTheDocument();
  });
});
