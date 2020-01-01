import React from 'react';
import { render } from '@testing-library/react';
import Calendar from 'components/calendar/Calendar';

test('renders learn react link', () => {
  const { getByText } = render(<Calendar />);
  const linkElement = getByText(/2020년/i);
  expect(linkElement).toBeInTheDocument();
});

describe('My Test Suite', () => {
  it('My Test Case', () => {
    expect(true).toEqual(true);
  });
});