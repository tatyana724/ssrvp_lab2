// src/store/reducers/authReducer.js
const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS':
      return { ...state, isAuthenticated: true, user: action.payload, loading: false };
    case 'LOGIN_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'LOGOUT':
      return { ...state, isAuthenticated: false, user: null };
    case 'UPDATE_PROFILE_SUCCESS':
      return { ...state, user: action.payload };
    default:
      return state;
  }
};