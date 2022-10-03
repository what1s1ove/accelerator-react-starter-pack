import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Breadcrumbs } from './breadcrumbs';

const breadcrumbsItems = [
  {title: 'Товар', link: ''},
];

describe('Breadcrumbs component', () => {
  it('renders correctly', () => {
    render(
      <BrowserRouter>
        <Breadcrumbs items={breadcrumbsItems} />
      </BrowserRouter>,
    );
    expect(screen.getByText('Main')).toBeInTheDocument();
  });
});
