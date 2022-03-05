import React from 'react';

import { render } from 'tests';

import Login from './Login';

describe('Login', () => {
  test('renders', () => {
    const { getByText } = render(<Login />);

    const element = getByText('Login');

    expect(element).toBeInTheDocument();
  });
});
