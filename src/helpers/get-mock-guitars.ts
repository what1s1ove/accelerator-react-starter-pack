
import { nanoid } from 'nanoid';
import { IGuitar } from '../types/IGuitars';
import { getRandomItem } from './get-random-item';

const GUITARS_COUNT = 5;
const guitarName = ['Честер Bass', 'CURT Z300', 'Roman LX'];
const guitarTypes = ['electric', 'ukulele', 'acoustic'];

const createMockGuitar = ():IGuitar => ({
  id: nanoid(),
  name: getRandomItem(guitarName),
  vendorCode: 'SO757575',
  type: getRandomItem(guitarTypes),
  description: 'Very good guitar',
  previewImg: '/public/img/guitar-1.jpg',
  stringCount: 5,
  rating: 5,
  price: 100,
  // comments?: Array<IComment>
});

export const getMockGuitars = () => {
  const guitars:Array<IGuitar> = [];

  for (let i = 0; i < GUITARS_COUNT; i++) {
    guitars.push(createMockGuitar());
  }

  return guitars;
};
