import React from 'react';
import { render } from '@testing-library/react';
import Root from 'client/Root';

test('renders learn react link', () => {
  const { getByText } = render(<Root />);
  const linkElement = getByText(/calendar/i);
  expect(linkElement).toBeInTheDocument();
});

describe('My Test Suite', () => {
  it('My Test Case', () => {
    expect(true).toEqual(true);
  });
});