import { render, screen } from '@testing-library/react';
import { SocialLinks } from './social-links';

describe('SocialLinks component', () => {
  test('should be rendered correctly', () => {
    render(<SocialLinks  />);

    expect(screen.getByTestId('facebook')).toBeInTheDocument();
  });
});
