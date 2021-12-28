import { GuitarName } from '../components/consts/consts';

const translateNameOfGuitar = (type: string | undefined) => {
  switch (type) {
    case GuitarName.Electric: {
      return 'Электрогитара';
    }
    case GuitarName.Acoustic: {
      return 'Акустическая';
    }
    case GuitarName.Ukulele: {
      return 'Укулеле';
    }
    default: {
      return '';
    }
  }
};

export {
  translateNameOfGuitar
};
