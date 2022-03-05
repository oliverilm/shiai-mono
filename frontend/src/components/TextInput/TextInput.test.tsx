import React from 'react';

import { render } from 'tests';

import TextInput from './TextInput';

describe('TextInput', () => {
  test('renders', () => {
    const { getByText } = render(<TextInput />);

    const element = getByText('TextInput');

    expect(element).toBeInTheDocument();
  });
});
