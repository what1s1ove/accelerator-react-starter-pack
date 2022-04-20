/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { Icon } from '../icon/icon';
import sprite from '../../assets/sprite.svg';

export function Rating() {
  const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));
  //   const [ratingArray, setRatingArray] = useState(new Array(5));

  return (
    <div>
      {ratingArray.map((item) => (
        <span key={item.key}>
          <Icon name={`${sprite}#full-star`} color="#C90606" width="14" height="12" />
        </span>))}
    </div>
  );
}
