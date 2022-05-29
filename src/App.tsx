import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import useForm from './useForm';
import validate from './validate';

const initialState = {
  name: {
    value: '',
    required: true,
    requiredMessage: 'name is required!',
  },
  companyType: {
    value: 0,
    required: true,
    requiredMessage: 'companyType is required!',
  },
  companyPurpose: {
    value: 0,
    required: true,
    requiredMessage: 'companyPurpose is required!',
  },
  clientPhoneFirst: {
    value: '',
    phone: true,
    phoneMessage: 'Phone is not valid!'
  },
  clientPhoneSecond: {
    value: '',
    phone: true,
    phoneMessage: 'Phone is not valid!'
  },
  clientEmail: {
    value: '',
    email: true,
    emailMessage: 'Email address is not valid!'
  },
  /*clientEmail: {
    value: 0,
    number: true,
    numberMessage: 'Only number!'
  },*/
}

const errorInitialState = {
	name: '',
	companyType: '',
	companyPurpose: '',
	clientPhoneFirst: '',
	clientPhoneSecond: '',
	clientEmail: ''
}

function App() {
  const { values, errors, handleChange, setErrors, setValues } = useForm(initialState, errorInitialState, validate);

  const companyType = [
    {
      label: 'No data',
      value: 0
    },
    {
      label: 'Company',
      value: 1
    },
    {
      label: 'Government',
      value: 2
    },
    {
      label: 'School',
      value: 3
    }
  ];
  const companyPurpose = [
    {
      label: 'No data',
      value: 0
    },
    {
      label: 'Demo',
      value: 1
    },
    {
      label: 'Sell',
      value: 3
    },
    {
      label: 'Test',
      value: 4
    }
  ];


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formErrors = validate(values, true);
    setErrors(formErrors);
    
  } 
/*useEffect(() => {
setValues({...values, name: {value:'test'}});
},[]);*/
  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField 
          autoFocus
          margin='dense'
          id='name'
          name='name'
          label='업체명'
          fullWidth
          variant='outlined'
          onChange={handleChange}
          value={values.name.value}
          error={Boolean(errors.name)}
          helperText={errors.name}
        />
        <TextField
          select
          margin='dense'
          id='companyType'
          name='companyType'
          label='구분'
          fullWidth
          variant='outlined'
          onChange={handleChange}
          value={values.companyType.value}
          error={Boolean(errors.companyType)}
          helperText={errors.companyType}
          >
          {companyType.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          margin='dense'
          id='companyPurpose'
          name='companyPurpose'
          label='상태'
          fullWidth
          variant='outlined'
          onChange={handleChange}
          value={values.companyPurpose.value}
          error={Boolean(errors.companyPurpose)}
          helperText={errors.companyPurpose}
          >
          {companyPurpose.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          margin='dense'
          id='clientPhoneFirst'
          name='clientPhoneFirst'
          label='업체 담당자 연락처 1'
          fullWidth
          variant='outlined'
          onChange={handleChange}
          value={values.clientPhoneFirst.value}
          error={Boolean(errors.clientPhoneFirst)}
          helperText={errors.clientPhoneFirst}
        />
        <TextField        
          margin='dense'
          id='clientPhoneSecond'
          name='clientPhoneSecond'
          label='업체 담당자 연락처 2'
          fullWidth
          variant='outlined'
          onChange={handleChange}
          value={values.clientPhoneSecond.value}
          error={Boolean(errors.clientPhoneSecond)}
          helperText={errors.clientPhoneSecond}
        />
        <TextField
          margin='dense'
          id='clientEmail'
          name='clientEmail'
          label='업체 담당자 이메일'
          fullWidth
          variant='outlined'
          onChange={handleChange}
          value={values.clientEmail.value}
          error={Boolean(errors.clientEmail)}
          helperText={errors.clientEmail}
        />	
        <Button type='submit' variant="outlined">Submit</Button>
      </form>
    </>
  );
}

export default App;
