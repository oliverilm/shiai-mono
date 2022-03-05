import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import API from '../../API';
import {
  IClub,
  IJudokaCreate,
  IUserPendingInClub,
} from '../../@types/api-types';
import { initUserDataThunk } from '../user/actions';
import { removeUserPending } from '../user/reducer';

export const fetchClubsThunk = createAsyncThunk('club/fetchClubs', async () => {
  const result = await API.club.list();
  return result.data;
});

export const fetchPendingUsers = createAsyncThunk(
  'club/getPending',
  async () => {
    const res = await API.club.getPendingList();
    return res.data;
  },
);

export const fetchClubExtraData = createAsyncThunk(
  'club/extraData',
  async ({ slug }: { slug: string }) => {
    const res = await API.club.additional(slug);
    return res.data;
  },
);

export const pendingActionThunk = createAsyncThunk(
  'club/acceptUser',
  async (
    {
      pending,
      action,
    }: {
      action: 'accept' | 'decline' | 'declineSelf';
      pending: IUserPendingInClub;
    },
    { dispatch },
  ) => {
    if (action === 'accept') {
      toast.info('User accepted', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      API.club
        .acceptPending(pending.id)
        .then(() => {
          dispatch(fetchPendingUsers());
        })
        .catch(() => {
          dispatch(fetchPendingUsers());
        });
    } else {
      if (action === 'declineSelf') {
        dispatch(removeUserPending());
      }
      API.club.declinePending(pending.id).catch(() => {
        dispatch(fetchPendingUsers());

        if (action === 'declineSelf') {
          dispatch(removeUserPending());
        }
      });
    }
  },
);

export const joinClubThunk = createAsyncThunk(
  'clubs/joinClub',
  async ({ club }: { club: IClub }, { dispatch }) => {
    await API.club
      .join(club.uuid)
      .then(() => {
        toast.success('Pending request sent!', {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        dispatch(initUserDataThunk());
      })
      .catch(() => {
        toast.error('Sorry, something went wrong', {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        dispatch(initUserDataThunk());
      });
  },
);

export const addJudokaThunk = createAsyncThunk(
  'club/addJudoka',
  async ({ judoka }: { judoka: IJudokaCreate }, { dispatch }) => {
    // TODO: only update judokas in redux
    API.judoka
      .create(judoka)
      .then(() => {
        dispatch(fetchClubExtraData({ slug: judoka.club }));

        toast.success('Judoka added!!', {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      })
      .catch(() => {
        dispatch(fetchClubExtraData({ slug: judoka.club }));

        toast.error('Sorry, something went wrong', {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });

    // todo: fix data fetching
  },
);
