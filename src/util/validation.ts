import * as yup from 'yup';

export const applicationFormValidation = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Please enter your email address'),
});
