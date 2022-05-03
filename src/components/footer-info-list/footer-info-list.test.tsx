import { render, screen } from '@testing-library/react';
import { FooterInfoList } from './footer-info-list';

describe('FooterInfoList component', () => {
  test('should be rendered correctly', () => {
    render(<FooterInfoList />);
    expect(screen.getByText('Где купить?')).toBeInTheDocument();
    expect(screen.getByText('Сервис-центры')).toBeInTheDocument();
  });
});
