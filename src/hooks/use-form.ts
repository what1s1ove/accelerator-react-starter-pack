import { ChangeEvent, FormEvent, useState } from 'react';

interface Validation {
  required?: {
      value: boolean,
      message: string
  },
}

type Validations<T extends Record<string, unknown>> = Partial<Record<keyof T, Validation>>;
type ErrorRecord<T> = Partial<Record<keyof T, string>>;

export const useForm = <T extends Record<keyof T, unknown>>(
  submitForm: () => void,
  validations?: Validations<T>,
) => {
  const [values, setValues] = useState<T>({} as T);
  const [errors, setErrors] = useState<ErrorRecord<T>>({});

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let valid = true;
    const newErrors: ErrorRecord<T> = {};

    if (validations) {
      for (const key in validations) {
        const value = values[key];
        const validation = validations[key];

        if (validation?.required?.value && !value) {
          valid = false;
          newErrors[key] = validation?.required?.message;
        }
      }

      if (!valid) {
        setErrors(newErrors);
        return;
      }
    }

    submitForm();
    setValues({} as T);
    setErrors({} as ErrorRecord<T>);
  };

  const handleFormChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setValues({...values, [name]: name === 'rating' ? Number(value) : value});
  };

  return {
    values,
    errors,
    setValues,
    handleFormSubmit,
    handleFormChange,
  };
};
