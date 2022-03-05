import React from 'react';

import { render } from 'tests';

import UserClubCard from './UserClubCard';

describe('UserClubCard', () => {
  test('renders', () => {
    const { getByText } = render(<UserClubCard />);

    const element = getByText('UserClubCard');

    expect(element).toBeInTheDocument();
  });
});
