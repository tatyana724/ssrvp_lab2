import {
  createAsyncThunk,
  createSlice,
  configureStore, combineReducers
} from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import axios from "axios";
import { userReducer } from "./redux";

export async function fetchTodos(dispatch) {
  const response = await axios.get("http://localhost:3000/feedbacks");
  dispatch({ type: "feedbacks/feedbacks", payload: response });
}

export const fetchFeedbacks = createAsyncThunk(
  "feedbacks/feedbacks",
  async () => {
    const response = await axios.get("/feedbacks");
    return response.data;
  }
);

export const postsSlice = createSlice({
  name: "feedbacks",
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedbacks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFeedbacks.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchFeedbacks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const postsApi = createApi({
  reducerPath: "feedbacks",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  endpoints: (builder) => ({
    fetchAllFeedbacks: builder.query({
      query: () => ({ url: "/feedbacks" }),
    }),
  }),
});

export const { useGetPostQuery } = createApi;

const rootReducer = combineReducers({
  user: userReducer,
  [postsApi.reducerPath]: postsApi.reducer
})

export const store = () => {
  return configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware()
              .concat(postsApi.middleware)
  })
}

/*
export const store = configureStore({
  reducer: {
    feedbacks: postsApi.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware().concat(postsApi.middleware),
});
*/