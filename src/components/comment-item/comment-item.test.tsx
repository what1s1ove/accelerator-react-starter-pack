import { render, screen } from '@testing-library/react';
import { makeFakeComments } from '../../utils/mocks';
import CommentItem from './comment-item';

const comments = makeFakeComments();

describe('Component: CommentItem', () => {

  it('should render CommentItem', () => {
    render(<CommentItem review={comments[0]} />);

    expect(screen.getByText(comments[0].userName)).toBeInTheDocument();
    expect(screen.getByText(comments[0].advantage)).toBeInTheDocument();
    expect(screen.getByText(comments[0].disadvantage)).toBeInTheDocument();
  });
});
