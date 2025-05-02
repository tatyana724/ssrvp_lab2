// app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { usersApi } from '../api/usersApi';

export const store = configureStore({
  reducer: {
    // Добавляем редюсер API
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    // Добавляем middleware API
    getDefaultMiddleware().concat(usersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
