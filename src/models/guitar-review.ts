import IGuitarPostReview from './guitar-post-review';

interface IGuitarReview extends IGuitarPostReview {
  id: string,
  createAt: Date,
}

export default IGuitarReview;
