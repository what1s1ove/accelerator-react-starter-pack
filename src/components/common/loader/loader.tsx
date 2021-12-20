import React, { useEffect, useState } from 'react';
import Message from '../message/message';

const INTERVAL = 500;
const MAX_DOT_COUNT = 3;
const MESSAGE = 'Загрузка';

function Loader() {
  const [ message, setMessage ] = useState(MESSAGE);

  useEffect(() => {
    let count = 0;

    const interval = setInterval(() => {
      count++;
      setMessage((prev) => prev.concat('.'));

      if (count === MAX_DOT_COUNT) {
        count = 0;

        setMessage(MESSAGE);
      }
    }, INTERVAL);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Message message={message}/>
  );
}

export default Loader;
