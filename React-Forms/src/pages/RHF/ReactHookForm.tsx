import { useDispatch, useSelector } from 'react-redux';
import { redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RootState } from '../../store/store';
import { Data, dataValidationSchema } from '../../validation/schema';
import { setInfo } from '../../store/reducers/controlledFormSlice';
import { IFormState } from '../../types/types';
import './ReactHookForm.css';

export default function ReactHookForm() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isValid, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(dataValidationSchema),
    mode: 'onChange',
  });
  const dispatch = useDispatch();
  const countries = useSelector((state: RootState) => state.countriesListSlice);

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

  const submitForm = (data: IFormState | Data) => {
    dispatch(
      setInfo({
        key: 'userName',
        value: data.userName,
      })
    );
    dispatch(
      setInfo({
        key: 'age',
        value: data.age,
      })
    );
    dispatch(
      setInfo({
        key: 'email',
        value: data.email,
      })
    );
    dispatch(
      setInfo({
        key: 'password',
        value: data.password,
      })
    );
    dispatch(
      setInfo({
        key: 'confirmPassword',
        value: data.confirmPassword,
      })
    );

    if (data.picture instanceof FileList) getBase64(data.picture);

    dispatch(
      setInfo({
        key: 'country',
        value: data.country,
      })
    );
    isSubmitSuccessful ?? redirect('/');
  };

  watch(['userName', 'age', 'email', 'password', 'confirmPassword', 'picture', 'country']);

  return (
    <form onSubmit={handleSubmit(submitForm)} className="form" noValidate>
      <label>
        Name:
        <input type="text" {...register('userName', { required: true })} />
      </label>
      <p>{errors.userName?.message}</p>
      <label>
        Age:
        <input type="number" {...register('age', { required: true })} />
      </label>
      <p>{errors.age?.message}</p>
      <label>
        Email:
        <input type="email" {...register('email', { required: true })} />
      </label>
      <p>{errors.email?.message}</p>

      <label>
        Password:
        <input type="password" {...register('password', { required: true })} />
      </label>
      <p>{errors.password?.message}</p>

      <label>
        Confirm password:
        <input type="password" {...register('confirmPassword', { required: true })} />
      </label>
      <p>{errors.confirmPassword?.message}</p>

      <div>
        <span>Gender:</span>
        <select id="gender" {...register('gender', { required: true })}>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <label>
        Accept T&C
        <input type="checkbox" {...register('acceptanceTC', { required: true })} />
      </label>
      <p>{errors.acceptanceTC?.message}</p>

      <label>
        Upload picture
        <input type="file" accept=".png, .jpeg" {...register('picture', { required: true })} />
      </label>
      <p>{errors.picture?.message}</p>

      <label htmlFor="country">Country</label>
      <input
        id="country"
        type="text"
        autoComplete="country-name"
        list="country-list"
        {...register('country', { required: true })}
      />
      <p>{String(errors.country?.message)}</p>

      <datalist id="country-list">
        <label htmlFor="suggestion">countries: </label>
        <select name="altCountry" id="suggestion">
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </select>
      </datalist>

      <input type="submit" value="Submit" disabled={!isValid} />
    </form>
  );
}
