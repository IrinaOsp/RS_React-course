export type TypeGender = 'Male' | 'Female' | 'Other';
export type TypeFormItems =
  | 'userName'
  | 'age'
  | 'email'
  | 'password'
  | 'confirmPassword'
  | 'gender'
  | 'acceptanceTC'
  | 'picture'
  | 'country';

export type TypeInfoPayload = {
  key: TypeFormItems;
  value: ISliceState[TypeFormItems];
};

export interface ISliceState {
  userName: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: TypeGender;
  acceptanceTC: boolean;
  picture: string | ArrayBuffer | null;
  country: string;
}

export interface IFormState extends Omit<ISliceState, 'picture'> {
  picture: FileList | null;
}

export type ErrorsState = {
  [key in TypeFormItems]?: string;
};
