import { render, screen } from '@testing-library/react';
import { Review } from '.';

describe('Review Component', () => {
  test('should rendered correctly', () => {
    render(
      <Review
        authorName="Name"
        date={new Date()}
        rating={4}
        advantages="A lot of"
        disadvantages="Very little"
        comment="New comment"
      />,
    );

    expect(screen.getByText('Name')).toBeInTheDocument();
  });
});
