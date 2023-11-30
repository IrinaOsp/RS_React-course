export type TypeGender = 'Male' | 'Female' | 'Other';
export type TypeFormItems =
  | 'name'
  | 'age'
  | 'email'
  | 'password'
  | 'gender'
  | 'acceptanceTC'
  | 'picture'
  | 'country';

export type TypeInfoPayload = {
  key: TypeFormItems;
  value: IFormState[TypeFormItems];
};

export interface IFormState {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: TypeGender;
  acceptanceTC: boolean;
  picture: object;
  country: string;
}
