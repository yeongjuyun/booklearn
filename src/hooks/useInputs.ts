import {useState} from 'react';

type InputValues<T> = {
  [K in keyof T]: string;
};

type InputErrors<T> = {
  [K in keyof T]?: string;
};

type Inputs<T> = {
  values: InputValues<T>;
  errors: InputErrors<T>;
  isValidLength: Partial<{[K in keyof T]: boolean}>;
  handleChange: (name: keyof T, value: string) => void;
  handleBlur: (name: keyof T) => void;
  clearInputs: () => void;
  setError: (name: keyof T, errorMessage: string) => void;
};

type ValidationRules<T> = {
  [K in keyof T]: (value: string) => string | undefined;
};

const useInputs = <T>(
  initialValues: InputValues<T>,
  validationRules?: ValidationRules<T>,
): Inputs<T> => {
  const initialErrors: InputErrors<T> = {};
  for (const key in initialValues) {
    if (Object.prototype.hasOwnProperty.call(initialValues, key)) {
      initialErrors[key] = '';
    }
  }

  const [values, setValues] = useState<InputValues<T>>(initialValues);
  const [errors, setErrors] = useState<InputErrors<T>>(initialErrors);

  const isValidLength: Inputs<T>['isValidLength'] = {};
  for (const key in initialValues) {
    if (Object.prototype.hasOwnProperty.call(initialValues, key)) {
      isValidLength[key] = values[key] ? values[key].length > 0 : false;
    }
  }

  const handleChange = (name: keyof T, value: string) => {
    setValues(prevState => ({
      ...prevState,
      [name]: value,
    }));
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleBlur = (name: keyof T): string | undefined => {
    let errorMessage: string | undefined;

    if (validationRules) {
      errorMessage = validationRules[name](values[name]);
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: errorMessage,
      }));
    }

    return errorMessage;
  };

  const clearInputs = () => {
    setValues(initialValues);
    setErrors(initialErrors);
  };

  const setError = (name: keyof T, errorMessage: string) => {
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  return {
    values,
    errors,
    isValidLength,
    handleChange,
    handleBlur,
    clearInputs,
    setError,
  };
};

export default useInputs;
