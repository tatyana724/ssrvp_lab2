// src/store/rootReducer.js
import { combineReducers } from 'redux';
import { feedbackReducer } from './reducers/feedbackReducer';
import { authReducer } from './reducers/authReducer';
import { counterReducer } from './reducers/counterReducer'; // если у вас есть счетчик

export const rootReducer = combineReducers({
  feedback: feedbackReducer,
  auth: authReducer,
  count: counterReducer, // добавьте другие редьюсеры по необходимости
});