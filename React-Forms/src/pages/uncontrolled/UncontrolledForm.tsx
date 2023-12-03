import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UncontrolledForm.css';
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { dataValidationSchema } from '../../validation/schema';
import { setInfo } from '../../store/reducers/uncontrolledFormSlice';
import { ErrorsState, IFormState, TypeFormItems, TypeGender } from '../../types/types';
import { ValidationError } from 'yup';

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
  // const UCFdata = useSelector((state: RootState) => state.uncontrolledFormSlice);
  const getBase64 = (file: FileList) => {
    const reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = () => {
      dispatch(
        setInfo({
          key: 'picture',
          value: file.length ? reader.result : 'no file',
        })
      );
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  };
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
      dispatch(
        setInfo({
          key: 'userName',
          value: formData.userName,
        })
      );
      dispatch(
        setInfo({
          key: 'age',
          value: formData.age,
        })
      );
      dispatch(
        setInfo({
          key: 'email',
          value: formData.email,
        })
      );
      dispatch(
        setInfo({
          key: 'password',
          value: formData.password,
        })
      );
      dispatch(
        setInfo({
          key: 'confirmPassword',
          value: formData.confirmPassword,
        })
      );
      dispatch(
        setInfo({
          key: 'gender',
          value: formData.gender,
        })
      );
      dispatch(
        setInfo({
          key: 'acceptanceTC',
          value: formData.acceptanceTC,
        })
      );
      if (formData.picture instanceof FileList) getBase64(formData.picture);

      dispatch(
        setInfo({
          key: 'country',
          value: formData.country,
        })
      );
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
        Name:
        <input type="text" name="name" ref={nameRef} required />
      </label>
      <p>{errors.userName}</p>
      <label>
        Age:
        <input type="number" name="age" ref={ageRef} required />
      </label>
      <p>{errors.age}</p>
      <label>
        Email:
        <input type="email" name="email" ref={emailRef} required />
      </label>
      <p>{errors.email}</p>
      <label>
        Password:
        <input type="password" name="password" ref={passwordRef} required />
      </label>
      <p>{errors.password}</p>
      <label>
        Confirm password:
        <input type="password" name="confirmPassword" ref={confirmPasswordRef} required />
      </label>
      <p>{errors.confirmPassword}</p>
      <div>
        <span>Gender:</span>
        <select name="gender" id="gender" ref={genderRef} required>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <p>{errors.gender}</p>
      <label>
        Accept T&C
        <input type="checkbox" name="acceptanceTC" ref={acceptanceTCRef} required />
      </label>
      <p>{errors.acceptanceTC}</p>
      <label>
        Upload picture
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
