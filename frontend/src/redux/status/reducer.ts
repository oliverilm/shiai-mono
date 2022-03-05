import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit';
import { NoInfer } from '@reduxjs/toolkit/dist/tsHelpers';

import { fetchCompetitionsThunk } from '../competition/actions';
import { authenticateThunk, initUserDataThunk } from '../user/actions';
import { fetchClubsThunk } from '../club/actions';

export interface StateReducerI {
  loading: number;
  errors: string[];
  warning: string[];
  successes: string[];
}

const initialState: StateReducerI = {
  loading: 0,
  errors: [],
  warning: [],
  successes: [],
};

const generateLoadingHandlers = (
  builder: ActionReducerMapBuilder<NoInfer<StateReducerI>>,
) => {
  [initUserDataThunk, fetchCompetitionsThunk, fetchClubsThunk].forEach(
    (thunk) => {
      builder
        .addCase(thunk.pending, (state) => {
          state.loading += 1;
        })
        .addCase(thunk.rejected, (state, action) => {
          state.errors = [
            ...state.errors,
            action.error.message?.toString() ?? JSON.stringify(action.payload),
          ];
          state.loading -= 1;
        })
        .addCase(thunk.fulfilled, (state) => {
          state.loading -= 1;
        });
    },
  );
};

const generateRejectionHandlers = (
  builder: ActionReducerMapBuilder<NoInfer<StateReducerI>>,
) => {
  [authenticateThunk].forEach((thunk) => {
    builder.addCase(thunk.rejected, (state, action) => {
      // TODO : catch api errors
      // console.log({payload: action.payload})
      state.errors = [
        ...state.errors,
        action.error.message?.toString() ?? JSON.stringify(action.payload),
      ];
    });
  });
};

export const statusSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    incrementLoading: (state) => {
      state.loading += 1;
    },
    decrementLoading: (state) => {
      state.loading -= 1;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    generateLoadingHandlers(builder);
    generateRejectionHandlers(builder);
  },
});

export const { incrementLoading, decrementLoading } = statusSlice.actions;

export default statusSlice.reducer;
