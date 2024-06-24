import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { ProfileState, UserProfile } from '../../../types/profile';

const initialState: ProfileState = {
  user: null,
  loading: false,
  error: null,
};

export const fetchUserProfile = createAsyncThunk<UserProfile>('profile/fetchUserProfile', async () => {
  const res = await axios.get('https://reqres.in/api/users/7');
  return res.data.data
});

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers:{
    clearProfile() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchUserProfile.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    })
    .addCase(fetchUserProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string
    });
  },
});

export const {clearProfile} = profileSlice.actions;

export default profileSlice.reducer;