import React from 'react';

import { render } from 'tests';

import BackButton from './BackButton';

describe('BackButton', () => {
  test('renders', () => {
    const { getByText } = render(<BackButton />);

    const element = getByText('BackButton');

    expect(element).toBeInTheDocument();
  });
});
