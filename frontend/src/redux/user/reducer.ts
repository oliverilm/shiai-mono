import { createSlice } from '@reduxjs/toolkit';

import { IUser } from '../../@types/api-types';
import {
  authenticateGoogleThunk,
  authenticateThunk,
  initUserDataThunk,
  registerUserThunk,
} from './actions';
import { SHIAI_USER } from '../../constants';

export interface UserState {
  user: IUser | null;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  user: null,
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem(SHIAI_USER);
    },
    removeUserPending: (state) => {
      if (state.user) state.user.profile.pending = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(initUserDataThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(authenticateThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(authenticateGoogleThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
      });
  },
});

export const { logout, removeUserPending } = userSlice.actions;

export default userSlice.reducer;
