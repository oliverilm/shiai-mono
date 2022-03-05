import React from 'react';

import { render } from 'tests';

import Profile from './Profile';

describe('Profile', () => {
  test('renders', () => {
    const { getByText } = render(<Profile />);

    const element = getByText('Profile');

    expect(element).toBeInTheDocument();
  });
});
