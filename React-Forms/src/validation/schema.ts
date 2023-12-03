import * as yup from 'yup';
import YupPassword from 'yup-password';
import countriesList from '../data/countries';
import { IFormState } from '../types/types';

YupPassword(yup);

export const dataValidationSchema = yup.object<IFormState>().shape({
  userName: yup
    .string()
    .matches(/^[A-Z]/, 'Name should start with uppercase')
    .required(),
  age: yup.number().moreThan(0).lessThan(120).typeError('Age must be a number').required(),
  email: yup.string().email().required(),
  password: yup.string().password().required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .password()
    .required(),
  gender: yup.string().equals(['male', 'female', 'other']).required(),
  acceptanceTC: yup.boolean().isTrue('Please accept T&C').required(),
  picture: yup
    .mixed()
    .test('fileSize', 'File size is too large', (value) => {
      return value instanceof FileList && value.length !== 0 && value[0].size <= 5e6;
    })
    .test('fileType', 'Invalid file type', (value) => {
      return (
        value instanceof FileList &&
        value.length !== 0 &&
        ['image/jpeg', 'image/png'].includes(value[0].type)
      );
    })
    .required('Please upload the file'),
  country: yup.string().equals(countriesList, 'Please choose the country from the list').required(),
});

export type Data = yup.InferType<typeof dataValidationSchema>;
