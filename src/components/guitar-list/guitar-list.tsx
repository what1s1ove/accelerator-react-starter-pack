import React from 'react';
import GuitarCard from '../guitar-card/guitar-card';
import {Guitar} from '../../types/guitar';

type GuitarListProps = {
  guitars: Guitar[],
}

function GuitarList({guitars}:GuitarListProps):JSX.Element {
  return (
    <div className="cards catalog__cards">
      {guitars.map((guitar) => (
        <GuitarCard
          guitar={guitar}
          key={guitar.id}
        />
      ))}
    </div>
  );
}

export default GuitarList;
