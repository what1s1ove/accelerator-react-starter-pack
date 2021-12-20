import IGuitar from 'models/guitar';
import IGuitarReview from 'models/guitar-review';

const mapGuitar = (guitar: IGuitar): IGuitar => ({
  ...guitar,
  id: guitar.id.toString(),
  previewImg: `../${guitar.previewImg}`,
});

const mapGuitars = (guitars: IGuitar[]): IGuitar[] =>
  guitars.map(mapGuitar);

const mapGuitarReview = (review: IGuitarReview): IGuitarReview => ({
  ...review,
  guitarId: review.guitarId.toString(),
  createAt: new Date(review.createAt),
});

const mapGuitarReviews = (reviews: IGuitarReview[]): IGuitarReview[] =>
  reviews.map(mapGuitarReview);

export {
  mapGuitar,
  mapGuitars,
  mapGuitarReview,
  mapGuitarReviews
};
