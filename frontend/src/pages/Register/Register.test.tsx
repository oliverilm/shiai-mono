import React from 'react';

import { render } from 'tests';

import Register from './Register';

describe('Register', () => {
  test('renders', () => {
    const { getByText } = render(<Register />);

    const element = getByText('Register');

    expect(element).toBeInTheDocument();
  });
});
