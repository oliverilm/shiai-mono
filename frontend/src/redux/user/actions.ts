import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';

import { IUser } from '../../@types/api-types';
import {
  authenticate,
  authenticateGoogle,
  getProfile,
  registerUser,
} from '../../API';
import { SHIAI_USER } from '../../constants';

export const initUserDataThunk = createAsyncThunk(
  'user/fetchUser',
  async (): Promise<IUser | null> => {
    const result = await getProfile();
    if ('id' in result.data) {
      return result.data;
    }

    throw Error('User authentication failed');
  },
);

export const authenticateThunk = createAsyncThunk(
  'user/authenticate',
  async (data: { username: string; password: string }) => {
    const result = await authenticate(data.username, data.password);
    if ('access_token' in result.data) {
      localStorage.setItem(
        SHIAI_USER,
        JSON.stringify({
          access: result.data.access_token,
          refresh: result.data.refresh_token,
        }),
      );

      return result.data.user;
    }
    return null;
  },
);

export const authenticateGoogleThunk = createAsyncThunk(
  'user/fetchGoogleUser',
  async (payload: GoogleLoginResponseOffline | GoogleLoginResponse) => {
    const googleLoginResponse = await authenticateGoogle(payload);

    if ('access_token' in googleLoginResponse.data) {
      localStorage.setItem(
        SHIAI_USER,
        JSON.stringify({
          access: googleLoginResponse.data.access_token,
          refresh: googleLoginResponse.data.refresh_token,
        }),
      );

      return googleLoginResponse.data.user;
    }
    return null;
  },
);

export const registerUserThunk = createAsyncThunk(
  'user/registerUser',
  async (payload: { email: string; password: string }) => {
    const registrationData = {
      email: payload.email,
      username: payload.email,
      password1: payload.password,
      password2: payload.password,
    };
    const response = await registerUser(registrationData);

    if ('access_token' in response.data) {
      localStorage.setItem(
        SHIAI_USER,
        JSON.stringify({
          access: response.data.access_token,
          refresh: response.data.refresh_token,
        }),
      );
      return response.data.user;
    }
    return null;
  },
);
