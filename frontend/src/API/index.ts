/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';

import {
  IAuthUser,
  Base,
  IBelt,
  IClubAdditionalData,
  IClubCreate,
  IClub,
  ICompetition,
  CountryI,
  IJudokaCreate,
  IUser,
  IUserPendingInClub,
  VerifyFailedResponse,
  ICategoryInCompetition,
  IClubJudokas,
  ICategory,
  ICreateCategoryInCompetition,
  IJudokaInCompetition,
} from '../@types/api-types';
import shiai from './shiai.instance';

const post = <T, D>(url: string, data: T): Promise<Base<D>> =>
  shiai.post(url, data);
const get = <T>(url: string): Promise<Base<T>> => shiai.get(url);
const put = <T, D>(url: string, data: T): Promise<Base<D>> =>
  shiai.put(url, data);
const del = <T>(url: string): Promise<Base<T>> => shiai.delete(url);

export const authenticate = (
  username: string,
  password: string,
): Promise<Base<IAuthUser>> =>
  shiai.post('dj-rest-auth/login/', { username, password });

export const getProfile = (): Promise<Base<IUser | VerifyFailedResponse>> =>
  shiai.get('/dj-rest-auth/user/');

export const authenticateGoogle = (
  response: GoogleLoginResponse | GoogleLoginResponseOffline,
): Promise<any> => {
  if ('accessToken' in response) {
    return shiai.post('auth/google/', {
      access_token: response.accessToken,
      id_token: response.tokenId,
    });
  }
  return shiai.post('auth/google/', {
    code: response.code,
  });
};

export const registerUser = (data: {
  username: string;
  email: string;
  password1: string;
  password2: string;
}): Promise<Base<any>> => shiai.post('dj-rest-auth/registration/', data);

const API = {
  club: {
    acceptPending: (id: number): Promise<Base<unknown>> =>
      del(`api/club/accept-user/${id}`),
    declinePending: (id: number): Promise<Base<unknown>> =>
      del(`api/club/decline-pending/${id}`),

    deleteClub: (slug: string): Promise<Base<unknown>> =>
      put(`api/club/delete/${slug}`, {}),

    join: (club: string): Promise<Base<unknown>> =>
      post('api/club/join', { club }),

    cancelPending: (): Promise<Base<unknown>> => del('api/club/cancel-pending'),

    getPendingList: (): Promise<Base<IUserPendingInClub[]>> =>
      get<IUserPendingInClub[]>('api/club/pending-list'),

    list: (): Promise<Base<IClub[]>> => get<IClub[]>('api/club/list'),

    detail: (slug: string): Promise<Base<IClub>> =>
      get<IClub>(`api/club/detail/${slug}`),

    create: (data: IClubCreate): Promise<Base<IClub>> =>
      post<IClubCreate, IClub>('api/club/create', data),

    additional: (slug: string): Promise<Base<IClubAdditionalData>> =>
      get<IClubAdditionalData>(`api/club/additional/${slug}`),
  },
  competition: {
    list: (): Promise<Base<ICompetition[]>> =>
      get<ICompetition[]>('api/competition/list'),

    getCompetitionJudokas: (
      slug: string,
    ): Promise<Base<IJudokaInCompetition[]>> =>
      get(`api/competition/judokas/${slug}`),
    upcoming: (): Promise<Base<unknown>> =>
      get<ICompetition[]>('api/competition/future'),

    detail: (slug: string): Promise<Base<unknown>> =>
      get<ICompetition>(`api/competition/detail/${slug}`),

    createCompetition: (
      data: Partial<ICompetition>,
    ): Promise<Base<ICompetition>> =>
      post<Partial<ICompetition>, ICompetition>('api/competition/create', data),
    addCategory: (
      cat: ICreateCategoryInCompetition,
      slug: string,
    ): Promise<Base<unknown>> =>
      post(`api/competition/categories/${slug}`, cat),

    updateCategory: (
      cat: ICategoryInCompetition,
      slug: string,
    ): Promise<Base<unknown>> => put(`api/competition/categories/${slug}`, cat),
    getRegisteredCategories: (
      slug: string,
    ): Promise<Base<ICategoryInCompetition[]>> =>
      get<ICategoryInCompetition[]>(`api/competition/categories/${slug}`),
  },
  judoka: {
    create: (data: IJudokaCreate): Promise<Base<IClubJudokas>> =>
      post<IJudokaCreate, IClubJudokas>('api/judoka/create', data),
  },
  generic: {
    getCountries: (): Promise<Base<CountryI[]>> =>
      get<CountryI[]>('api/countries'),

    getBelts: (): Promise<Base<IBelt[]>> => get<IBelt[]>('api/generics/belts'),
    getCategories: (): Promise<Base<ICategory[]>> =>
      get<ICategory[]>('api/generics/categories'),
  },

  auth: {
    update: (data: Partial<IClubJudokas>): Promise<Base<unknown>> =>
      post('auth/update/', data),
  },
};

export default API;
