import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { loginUser, registerUser } from '../store/actions/authActions';

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();

  const onSubmit = data => {
    dispatch(loginUser(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email', { required: 'Email required' })} placeholder="Email" />
      {errors.email && <span>{errors.email.message}</span>}
      <br />
      <input {...register('password', { required: 'password required' })} type="password" placeholder="Пароль" />
      {errors.password && <span>{errors.password.message}</span>}
      <br /><br />
      <button type="submit">Login to account</button>
    </form>
  );
}

function RegisterForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();

  const onSubmit = data => {
    dispatch(registerUser(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('username', { required: 'Username required' })} placeholder="Username" />
      {errors.username && <span>{errors.username.message}</span>}
      <br />
      <input {...register('email', { required: 'Email required' })} placeholder="Email" />
      {errors.email && <span>{errors.email.message}</span>}
      <br />
      <input {...register('password', { required: 'password required' })} type="password" placeholder="Пароль" />
      {errors.password && <span>{errors.password.message}</span>}
      <br /><br />
      <button type="submit">Register</button>
    </form>
  );
}

export function AuthForms() {
  return (
    <div>
      <h2>Authorization form</h2>
      <LoginForm />
      <h2>Registration form</h2>
      <RegisterForm />
    </div>
  );
}