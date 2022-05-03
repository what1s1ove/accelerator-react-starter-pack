import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Breadcrumbs } from './breadcrumbs';

const items = ['Main', 'Catalog'];
describe('Breadcrumbs component', () => {
  it('renders correctly', () => {
    render(
      <BrowserRouter>
        <Breadcrumbs items={items} />
      </BrowserRouter>,
    );
    expect(screen.getByText('Main')).toBeInTheDocument();
  });
});
