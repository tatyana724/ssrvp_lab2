import { createStore } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

// Начальное состояние
const initialState = {
  count: 0,
};

// Редюсер
function counterReducer(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
}

// Создание магазина
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
export default store;
