import { GuitarId } from 'models/guitar';

const BACKEND_URL = 'https://accelerator-guitar-shop-api-v1.glitch.me';
const TIMEOUT = 5000;

const GUITARS_LINK = '/guitars';
const REVIEWS_LINK = '/comments';

const BackendRoutes  = {
  Guitars: GUITARS_LINK,
  GuitarReviews: REVIEWS_LINK,
  getGuitarReviewsLink(guitarId: GuitarId) {
    return `${GUITARS_LINK}/${guitarId}/${REVIEWS_LINK}`;
  },
  getGuitarsLink(hasReviews: boolean) {
    return `${GUITARS_LINK}${hasReviews && '?_embed=comments'}`;
  },
};

export {
  BACKEND_URL,
  TIMEOUT
};

export default BackendRoutes;
