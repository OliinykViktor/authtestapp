import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { FeedState } from '../../../types/feed';

const initialState: FeedState = {
  images: [],
  loading: false,
  refreshing: false,
  error: null,
};

export const fetchMoreImages = createAsyncThunk(
  'feed/fetchMoreImages',
  async () => {
    const response = await axios.get('https://picsum.photos/v2/list');
    return response.data;
  }
);

export const refreshImages = createAsyncThunk(
  'feed/refreshImages',
  async () => {
    const response = await axios.get('https://picsum.photos/v2/list');
    return response.data;
  }
);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMoreImages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMoreImages.fulfilled, (state, action) => {
        state.images = state.images.concat(action.payload);
        state.loading = false;
      })
      .addCase(fetchMoreImages.rejected, (state) => {
        state.loading = false;
      })
      .addCase(refreshImages.pending, (state) => {
        state.refreshing = true;
      })
      .addCase(refreshImages.fulfilled, (state, action) => {
        state.images = action.payload;
        state.refreshing = false;
      })
      .addCase(refreshImages.rejected, (state) => {
        state.refreshing = false;
      });
  },
});

export default feedSlice.reducer;
