import { useState, useCallback } from 'react';

interface ErrorStateProps {
  [name: string]: string;
}

interface InitialStateProps {
  [name: string]: any;
}

const useForm = (initialState: InitialStateProps, errorInitialState: ErrorStateProps, validate: (A: object, B?: boolean) => {}) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState(errorInitialState);
  
  const setDataAndErrors = useCallback((data: any) => {
    setValues(data);

    const errors = validate(data);

    setErrors(errors);
  }, [validate]);
  
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    let updatedData;

    updatedData = {
      ...values,
      [e.target.name]: {
        ...values[e.target.name],
        value: e.target.value,
        touched: true
      }
    }

    setDataAndErrors(updatedData);
   }, [setDataAndErrors, values]);

  return {
    values,
    errors,
    handleChange,
    setErrors,
    setValues
  }
}

export default useForm;