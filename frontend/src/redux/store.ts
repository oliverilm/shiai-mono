import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import userReducer from './user/reducer';
import statusReducer from './status/reducer';
import competitionReducer from './competition/reducer';
import clubReducer from './club/reducer';
import { entitySlice } from './entities/reducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    status: statusReducer,
    clubs: clubReducer,
    competitions: competitionReducer,
    entities: entitySlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
