import React from 'react';

import { render } from 'tests';

import CompetitionsPhoneListItem from './CompetitionsPhoneListItem';

describe('CompetitionsPhoneListItem', () => {
  test('renders', () => {
    const { getByText } = render(<CompetitionsPhoneListItem />);

    const element = getByText('CompetitionsPhoneListItem');

    expect(element).toBeInTheDocument();
  });
});
