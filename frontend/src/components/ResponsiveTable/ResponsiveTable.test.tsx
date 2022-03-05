import React from 'react';

import { render } from 'tests';

import ResponsiveTable from './ResponsiveTable';

describe('ResponsiveTable', () => {
  test('renders', () => {
    const { getByText } = render(<ResponsiveTable />);

    const element = getByText('ResponsiveTable');

    expect(element).toBeInTheDocument();
  });
});
