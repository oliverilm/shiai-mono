import React from 'react';

import { render } from 'tests';

import ProfileAvatar from './ProfileAvatar';

describe('ProfileAvatar', () => {
  test('renders', () => {
    const { getByText } = render(<ProfileAvatar />);

    const element = getByText('ProfileAvatar');

    expect(element).toBeInTheDocument();
  });
});
