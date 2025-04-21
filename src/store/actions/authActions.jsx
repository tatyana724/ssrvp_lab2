import axios from 'axios';

export const loginUser = (credentials) => async (dispatch) => {
  dispatch({ type: 'LOGIN_REQUEST' });
  try {
    const response = await axios.post('http://localhost:3000/api/auth', credentials);
    console.log('Login response:', response.data); // Добавьте лог
    
    if (response.data.success) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: response.data.user });
    } else {
      dispatch({ 
        type: 'LOGIN_FAILURE', 
        payload: response.data.message || 'Authentication failed' 
      });
    }
  } catch (error) {
    console.error('Login error:', error.response || error); // Подробный лог
    dispatch({ 
      type: 'LOGIN_FAILURE', 
      payload: error.response?.data?.message || 
              error.message || 
              'Network error' 
    });
  }
};

export const registerUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:3000/api/register', userData);
    dispatch({ type: 'LOGIN_SUCCESS', payload: response.data.user });
  } catch (error) {
    console.error('Registration error:', error);
  }
};

export const updateProfile = (userId, profileData) => async (dispatch) => {
  try {
    const response = await axios.put(`http://localhost:3000/api/users/${userId}`, profileData);
    dispatch({ type: 'UPDATE_PROFILE_SUCCESS', payload: response.data.user });
  } catch (error) {
    console.error('Profile update error:', error);
  }
};