import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Form.css';
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { dataValidationSchema } from '../../validation/schema';
import { setForm } from '../../store/reducers/uncontrolledFormSlice';
import { ErrorsState, IFormState, TypeFormItems, TypeGender } from '../../types/types';
import { ValidationError } from 'yup';
import getBase64 from '../../helpers/helpers';

const initialState: ErrorsState = {
  userName: '',
  age: '',
  email: '',
  password: '',
  confirmPassword: '',
  gender: '',
  acceptanceTC: '',
  picture: '',
  country: '',
};

export default function UncontrolledForm() {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const acceptanceTCRef = useRef<HTMLInputElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<ErrorsState>(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const countries = useSelector((state: RootState) => state.countriesListSlice);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData: IFormState = {
      userName: nameRef.current!.value,
      age: +ageRef.current!.value,
      email: emailRef.current!.value,
      password: passwordRef.current!.value,
      confirmPassword: confirmPasswordRef.current!.value,
      gender: genderRef.current!.value as TypeGender,
      acceptanceTC: acceptanceTCRef.current!.value === 'on' ? true : false,
      picture: pictureRef.current!.files,
      country: countryRef.current!.value,
    };

    try {
      await dataValidationSchema.validate(formData, { abortEarly: false });

      const fileBase64: string = await getBase64(formData.picture!);

      dispatch(
        setForm({
          userName: formData.userName,
          age: formData.age,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          gender: formData.gender,
          acceptanceTC: formData.acceptanceTC,
          picture: fileBase64,
          country: formData.country,
        })
      );

      if (formData.picture instanceof FileList) getBase64(formData.picture);

      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (validationErrors: unknown) {
      if (validationErrors instanceof ValidationError) {
        const errorsMap: ErrorsState = {};
        validationErrors.inner.forEach((error) => {
          if (error.path) errorsMap[error.path as TypeFormItems] = error.message;
        });
        setErrors(errorsMap);
      } else {
        console.log('Error in validation');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <label>
        Name
        <input type="text" name="name" ref={nameRef} required />
      </label>
      <p>{errors.userName}</p>
      <label>
        Age
        <input type="number" name="age" ref={ageRef} required />
      </label>
      <p>{errors.age}</p>
      <label>
        Email
        <input type="email" name="email" ref={emailRef} required />
      </label>
      <p>{errors.email}</p>
      <label>
        Password
        <input type="password" name="password" ref={passwordRef} required />
      </label>
      <p>{errors.password}</p>
      <label>
        Confirm password
        <input type="password" name="confirmPassword" ref={confirmPasswordRef} required />
      </label>
      <p>{errors.confirmPassword}</p>

      <label>
        Gender
        <select name="gender" id="gender" ref={genderRef} required>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </label>
      <p>{errors.gender}</p>
      <label>
        Accept T&C
        <input type="checkbox" name="acceptanceTC" ref={acceptanceTCRef} required />
      </label>
      <p>{errors.acceptanceTC}</p>
      <label className="label-inputFile">
        Choose images to upload (PNG, JPG)
        <input
          type="file"
          accept=".png, .jpeg"
          size={5e6}
          name="picture"
          ref={pictureRef}
          required
        />
      </label>
      <p>{errors.picture}</p>

      <label htmlFor="country">Country</label>
      <input
        id="country"
        name="country"
        type="text"
        autoComplete="country-name"
        list="country-list"
        ref={countryRef}
        required
      />
      <p>{errors.country}</p>
      <datalist id="country-list">
        <label htmlFor="suggestion">countries: </label>
        <select name="altCountry" id="suggestion">
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </select>
      </datalist>

      <input type="submit" value="Submit" />
    </form>
  );
}
