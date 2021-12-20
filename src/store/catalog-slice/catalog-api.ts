import BackendRoutes from 'constants/backend';
import IGuitar, { GuitarId } from 'models/guitar';
import IGuitarReview from 'models/guitar-review';
import api from 'services/api';
import { mapGuitarReviews, mapGuitars } from 'services/guitar-mapper';

const fetchGuitars = async (hasReviews: boolean): Promise<IGuitar[]> => {
  const { data } = await api.get<IGuitar[]>(BackendRoutes.getGuitarsLink(hasReviews));

  return mapGuitars(data);
};

const fetchGuitarReviews = async (guitarId: GuitarId): Promise<IGuitarReview[]> => {
  const { data } = await api.get<IGuitarReview[]>(BackendRoutes.getGuitarReviewsLink(guitarId));

  return mapGuitarReviews(data);
};

export { fetchGuitars, fetchGuitarReviews };
