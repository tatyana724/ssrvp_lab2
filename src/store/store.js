import { configureStore } from "@reduxjs/toolkit";
import { combineReducers, createStore } from 'redux';
import { postsApi } from "./api";
import { userReducer } from "./redux";

function saveState(state, key) {
	const stringState = JSON.stringify(state);
	localStorage.setItem(key, stringState);
}

export const reducer = combineReducers({
  user: userReducer,
  posts: postsApi.reducer,
  
});

export const store = createStore(reducer);