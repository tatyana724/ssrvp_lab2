import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser } from '../store/actions/authActions';

function ProfileEdit() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  const onSubmit = data => {
    dispatch(updateProfile(user.id, data));
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input 
          {...register('username', { required: 'Username required' })} 
          defaultValue={user?.username} 
          placeholder="Username" 
        />
        {errors.username && <span>{errors.username.message}</span>}
        <br />
        <input 
          {...register('email', { required: 'Email required' })} 
          defaultValue={user?.email} 
          placeholder="Email" 
        />
        {errors.email && <span>{errors.email.message}</span>}
        <br /><br />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}

export default ProfileEdit;