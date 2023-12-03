import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RootState } from '../../store/store';
import { Data, dataValidationSchema } from '../../validation/schema';
import { setForm } from '../../store/reducers/controlledFormSlice';
import { IFormState } from '../../types/types';
import '../../styles/Form.css';
import getBase64 from '../../helpers/helpers';
import PasswordStrengthMeter from '../../components/PasswordStrengthMeter';

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
  const navigate = useNavigate();
  const countries = useSelector((state: RootState) => state.countriesListSlice);

  const submitForm = async (data: IFormState | Data) => {
    const fileBase64: string | null =
      data.picture instanceof FileList ? await getBase64(data.picture) : null;

    dispatch(
      setForm({
        userName: data.userName,
        age: data.age,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        gender: data.gender,
        acceptanceTC: data.acceptanceTC,
        picture: fileBase64,
        country: data.country,
      })
    );

    setTimeout(() => {
      isSubmitSuccessful && navigate('/');
    }, 2000);
  };

  watch(['userName', 'age', 'email', 'password', 'confirmPassword', 'picture', 'country']);

  return (
    <form onSubmit={handleSubmit(submitForm)} className="form" noValidate>
      <label>
        Name
        <input type="text" {...register('userName', { required: true })} />
      </label>
      <p>{errors.userName?.message}</p>
      <label>
        Age
        <input type="number" {...register('age', { required: true })} />
      </label>
      <p>{errors.age?.message}</p>
      <label>
        Email
        <input type="email" {...register('email', { required: true })} />
      </label>
      <p>{errors.email?.message}</p>

      <label>
        Password
        <input type="password" {...register('password', { required: true })} />
      </label>
      <PasswordStrengthMeter password={watch('password')} />
      <p>{errors.password?.message}</p>

      <label>
        Confirm password
        <input type="password" {...register('confirmPassword', { required: true })} />
      </label>
      <p>{errors.confirmPassword?.message}</p>

      <label>
        Gender
        <select id="gender" {...register('gender', { required: true })}>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </label>
      <p>{errors.gender?.message?.toString()}</p>

      <label>
        Accept T&C
        <input type="checkbox" {...register('acceptanceTC', { required: true })} />
      </label>
      <p>{errors.acceptanceTC?.message}</p>

      <label className="label-inputFile">
        Choose images to upload (PNG, JPG)
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
