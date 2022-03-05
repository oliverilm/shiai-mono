import React from 'react';

import { render } from 'tests';

import OpenCompetitionsList from './OpenCompetitionsList';

describe('OpenCompetitionsList', () => {
  test('renders', () => {
    const { getByText } = render(<OpenCompetitionsList />);

    const element = getByText('OpenCompetitionsList');

    expect(element).toBeInTheDocument();
  });
});
