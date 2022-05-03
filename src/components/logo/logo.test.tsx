import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Logo } from './logo';

describe('Logo component', () => {
  test('should be rendered correctly', () => {
    render(<BrowserRouter><Logo /></BrowserRouter>);
  });
});
