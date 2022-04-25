import {render, screen} from '@testing-library/react';
import App from './app';
import React from 'react';

test('Renders app-component', () => {
  render(<App />);
  const textElement = screen.getByText(/Hello, world!/i);
  expect(textElement).toBeInTheDocument();
});
