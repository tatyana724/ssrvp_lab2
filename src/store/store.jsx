// src/store/store.js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './rootReducer';

export const store = createStore(rootReducer, applyMiddleware(thunk));

const authInitialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null
};

const feedbackInitialState = {
  items: [],
  loading: false,
  error: null
};

const authReducer = (state = authInitialState, action) => {
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

const feedbackReducer = (state = feedbackInitialState, action) => {
  switch (action.type) {
    case 'FETCH_FEEDBACK_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_FEEDBACK_SUCCESS':
      return { ...state, items: action.payload, loading: false };
    case 'FETCH_FEEDBACK_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'DELETE_FEEDBACK_SUCCESS':
      return { ...state, items: state.items.filter(item => item.id !== action.payload) };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  auth: authReducer,
  feedback: feedbackReducer,
  // другие редьюсеры...
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;