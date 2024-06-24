import { configureStore } from '@reduxjs/toolkit';

import authSlice from './slices/authSlice';
import feedSlice from './slices/feedSlice';
import profileSlice from './slices/profileSlice';
import themeSlice from './slices/themeSlice';

export const store = configureStore({
  reducer:{
    auth: authSlice,
    feed: feedSlice,
    profile: profileSlice,
    theme: themeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;