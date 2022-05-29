const validateEmail = (email: string) => {
  const emailFormat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailFormat.test(email);
}

const validatePhone = (phone: string) => {
	const phoneFormat = /^(\d{2,3})-(\d{3,4})-(\d{4})$/;
	return phoneFormat.test(phone);
}

const validateNumber = (number: string) => {
	const numberFormat = /^[0-9]$/;
	return numberFormat.test(number);
}

interface ErrorRecord {
  [name: string]: string;
}

export default <S extends Record<keyof S, any> = {}>(fields: S, submit = false) => {
  let errors: ErrorRecord = {};

  for(let field in fields) {
    const currentField = fields[field];

    if (currentField.required && (currentField.value === '' || !currentField.value)) {
      errors[field] = currentField.requiredMessage ? currentField.requiredMessage : 'This field is required!';
	}
	
	if (!errors[field] && currentField.number && !validateNumber(currentField.value) && currentField.touched) {
		errors[field] = currentField.requiredMessage ? currentField.requiredMessage : 'Number Only!';
	} 

    if (!errors[field] && currentField.email && !validateEmail(currentField.value) && currentField.touched) {
      errors[field] = currentField.emailMessage ? currentField.emailMessage : 'Invalid email address!';
	}
	
	if (!errors[field] && currentField.phone && !validatePhone(currentField.value) && currentField.touched) {
		errors[field] = currentField.phoneMessage ? currentField.phoneMessage : 'Invalid phone number!';
	  }

    if (!errors[field] && currentField.minLength && currentField.value !== '' && currentField.value.length < currentField.minLength && currentField.touched) {
      errors[field] = currentField.minLengthMessage ? currentField.minLengthMessage : `This field must have at least ${currentField.minLength} characters`;
    }

    if (!errors[field] && currentField.maxLength && currentField.value !== '' && currentField.value.length > currentField.maxLength && currentField.touched) {
      errors[field] = currentField.maxLengthMessage ? currentField.maxLengthMessage : `This field must have less than ${currentField.maxLength} characters`;
    }
  }

  return errors;
}