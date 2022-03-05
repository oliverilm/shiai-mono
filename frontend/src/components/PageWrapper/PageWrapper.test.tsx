import React from 'react';

import { render } from 'tests';

import PageWrapper from './PageWrapper';

describe('PageWrapper', () => {
  test('renders', () => {
    const { getByText } = render(<PageWrapper />);

    const element = getByText('PageWrapper');

    expect(element).toBeInTheDocument();
  });
});
