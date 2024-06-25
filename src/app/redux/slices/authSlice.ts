import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AppDispatch } from "../store";
import { AuthState } from "../../../types/auth";
import messages from "../../../shared/models/messages";

const initialState: AuthState = {
  userToken: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading(state) {
      state.loading = true;
      state.error = null;
    },
    setUserToken(state, action: PayloadAction<string | null>) {
      state.userToken = action.payload;
      state.loading = false;
      state.error = null;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload as string;
      state.loading = false;
    },
    logout() {
      return initialState;
    },
  },
});

export const { setLoading, setError, setUserToken, logout } = authSlice.actions;

export const loginUser = () => async (dispatch: AppDispatch) => {
    dispatch(setLoading());
    try {
        const token = "someToken";
        await AsyncStorage.setItem("userToken", token);
        dispatch(setUserToken(token));
    } catch (e) {
      dispatch(setError(messages.errors.generic));
    }
  };

export const checkLoginStatus = () => async (dispatch: AppDispatch) => {
  const token = await AsyncStorage.getItem("userToken");
  if (token) {
    dispatch(setUserToken(token));
  }
};

export const logoutUser = () => async (dispatch: AppDispatch) => {
  await AsyncStorage.removeItem("userToken");
  dispatch(logout());
};

export default authSlice.reducer;
