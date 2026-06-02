import { configureStore } from '@reduxjs/toolkit';
import profileSlice from './profileSlice';
import blogSlice from './blogSlice';
import homePageSlice from './homePageSlice';
import productCartSlice from "./productCartSlice"

export const AppStore = configureStore({
  reducer: {
    profileSlice,
    blogSlice,
    homePageSlice,
    productCartSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof AppStore.getState>;
