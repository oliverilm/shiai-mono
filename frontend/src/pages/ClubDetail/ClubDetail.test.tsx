import React from 'react';

import { render } from 'tests';

import ClubDetail from './ClubDetail';

describe('ClubDetail', () => {
  test('renders', () => {
    const { getByText } = render(<ClubDetail />);

    const element = getByText('ClubDetail');

    expect(element).toBeInTheDocument();
  });
});
