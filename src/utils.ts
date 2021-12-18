const ICON_FULL_STAR = '#icon-full-star';
const ICON_STAR = '#icon-star';

const setRatingStars = (rating: number, rateCount: number): string =>
  rating >= rateCount ? ICON_FULL_STAR : ICON_STAR;

export {setRatingStars};
