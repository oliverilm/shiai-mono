import React from 'react';

import { render } from 'tests';

import DevLog from './DevLog';

describe('DevLog', () => {
  test('renders', () => {
    const { getByText } = render(<DevLog />);

    const element = getByText('DevLog');

    expect(element).toBeInTheDocument();
  });
});
