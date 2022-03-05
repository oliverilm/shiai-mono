import React from 'react';

import { render } from 'tests';

import ClubCreate from './ClubCreate';

describe('ClubCreate', () => {
  test('renders', () => {
    const { getByText } = render(<ClubCreate />);

    const element = getByText('ClubCreate');

    expect(element).toBeInTheDocument();
  });
});
