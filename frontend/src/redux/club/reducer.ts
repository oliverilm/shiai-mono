import { createSlice } from '@reduxjs/toolkit';

import {
  IClubAdditionalData,
  IClub,
  IUserPendingInClub,
} from '../../@types/api-types';
import {
  fetchClubExtraData,
  fetchClubsThunk,
  fetchPendingUsers,
} from './actions';

interface ClubSlice {
  clubs: IClub[];
  pending: IUserPendingInClub[];
  clubExtraInfo: IClubAdditionalData | null;
}

const initialState: ClubSlice = {
  clubs: [],
  pending: [],
  clubExtraInfo: null,
};

const clubSlice = createSlice({
  name: 'club',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClubsThunk.fulfilled, (state, action) => {
        state.clubs = action.payload;
      })
      .addCase(fetchPendingUsers.fulfilled, (state, action) => {
        state.pending = action.payload;
      })
      .addCase(fetchClubExtraData.fulfilled, (state, action) => {
        state.clubExtraInfo = action.payload;
      });
  },
});
export default clubSlice.reducer;
