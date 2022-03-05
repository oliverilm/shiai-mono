import React from 'react';

import { render } from 'tests';

import PageHeader from './PageHeader';

describe('PageHeader', () => {
  test('renders', () => {
    const { getByText } = render(<PageHeader />);

    const element = getByText('PageHeader');

    expect(element).toBeInTheDocument();
  });
});
