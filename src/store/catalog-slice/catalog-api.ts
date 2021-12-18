import BackendRoutes from 'constants/backend';
import IGuitar from 'models/guitar';
import api from 'services/api';
import { mapGuitars } from 'services/guitar-mapper';

const fetchGuitars = async (): Promise<IGuitar[]> => {
  const { data } = await api.get<IGuitar[]>(BackendRoutes.Guitars);

  return mapGuitars(data);
};

export { fetchGuitars };
