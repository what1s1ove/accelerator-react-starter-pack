import { FormEvent } from 'react';

const nameRegExp = /[A-Za-zА-Яа-яЁё]/;

const checkNameValidity = (event: FormEvent<HTMLInputElement>) => {
  if (!nameRegExp.test(event.currentTarget.value)) {
    return event.currentTarget.setCustomValidity('Вводите только буквы');
  }
  event.currentTarget.setCustomValidity('');
};
export {
  checkNameValidity
};
