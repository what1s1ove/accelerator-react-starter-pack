/* eslint-disable no-console */
import { FormEvent } from 'react';
import { GuitarName } from '../components/consts/consts';
import { Guitar } from '../types/shop-types';

const filterGuitarsByType = (evt: FormEvent<HTMLInputElement>, sortedGuitars: Guitar[], guitars: Guitar[]) => {
  const type = evt.currentTarget.name;
  switch (type && evt.currentTarget.checked) {
    case GuitarName.Acoustic && true: {

      return sortedGuitars.filter((guitar) => guitar.type === type);

    }
    case GuitarName.Ukulele && true: {
      return sortedGuitars.filter((guitar) => guitar.type === type);
    }
    case GuitarName.Electric && true: {
      return sortedGuitars.filter((guitar) => guitar.type === type);
    }
    default: {
      return guitars;
    }
  }
};


export {
  filterGuitarsByType
};

