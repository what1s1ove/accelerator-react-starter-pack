import IGuitar from 'models/guitar';

const mapGuitar = (guitar: IGuitar): IGuitar => ({
  ...guitar,
  id: guitar.id.toString(),
  previewImg: `../${guitar.previewImg}`,
});
const mapGuitars = (guitars: IGuitar[]): IGuitar[] =>
  guitars.map(mapGuitar);

export {
  mapGuitar,
  mapGuitars
};
