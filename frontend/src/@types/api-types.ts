export interface IResponseConfig {
  url: string;
  method: 'post' | 'get' | 'patch' | 'put' | 'delete';
  data: unknown;
  headers: {
    Accept: 'application/json, text/plain, */*';
    'Content-Type': 'application/json;charset=utf-8';
  };
  baseURL: string;
  transformRequest: [null];
  transformResponse: [null];
  timeout: 0;
  xsrfCookieName: 'XSRF-TOKEN';
  xsrfHeaderName: 'X-XSRF-TOKEN';
  maxContentLength: -1;
  maxBodyLength: -1;
}

export interface Base<T> {
  config: IResponseConfig;
  data: T;
  headers: unknown;
  status: number;
  statusText: string;
}

export interface IUnion {
  country: string;
  email: string;
  website: string;
}

export interface IProfile {
  avatarUrl?: string;
  pending: IUserPendingInClub | null;
  locale?: string;
  sex?: string;
  bio?: string;
  location?: string;
  isTrainer: boolean;
  isClubOwner: boolean;
  isUnionMember: boolean;
  union: IUnion | null;
  country?: string;
  birthDate?: Date;
  club?: string;
  judoka: IClubJudokas;
}

export interface IUser {
  id: number;
  profile: IProfile;
  last_login: Date;
  is_superuser: boolean;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  is_staff: boolean;
  is_active: boolean;
  date_joined: Date;
  groups: unknown[];
  user_permissions: unknown[];
}

export interface IAuthUser {
  access_token: string;
  refresh_token: string;
  user: IUser;
}

export interface VerifyFailedResponse {
  detail: string;
  code: string;
}

export interface ICompetition {
  uuid: string;
  isOwner: boolean;
  name: string;
  image?: string;
  slug: string;
  description: string;
  dateRange: string;
  location: string;
  categories: ICategoryInCompetition[];
  registrationEndDate: Date;
  registrationFee: number;
  currency: string;
  priorityLevel?: number | null;
  created: Date;
  isPublished: boolean;
  owner: number;
  start: string;
  end: string;
  clubName: null | string;
  competitorAmount: number;
  requireLicence: boolean;
}

export interface ICategory {
  id: number;
  underValue: string;
  value: string;
  created: Date;
}

export interface IJudoka {
  idCode: string;
  firstName: string;
  lastName: string;
  sex: 'M' | 'W';
  birthDay: string;
  club: string;
  belt: string;
  image: string;
  slug: string;
  uuid: string;
  created: string;
  trainer: string;
}

export interface IJudokaInCompetition {
  judoka: string;
  judokaObj: IJudoka;
  competition: string;
  category: ICategoryInCompetition;
  weight: string;
  fightingSex: string;
  slug: string;
  place: number;
  uuid: string;
  created: Date;
  categoryObj: ICategoryInCompetition;
  clubName: string;
  beltObj: IBelt;
}

export interface ICategoryInCompetition {
  menWeights: string;
  womenWeights: string;
  unisexWeights: string;
  identifier: string;
  amountOverAllowed: string;
  startingYear: string;
  endingYear: string;
  competition: ICompetition;
  categoryObj: ICategory;
  category: number;
  rules: string;
  created?: string;
  id: number;
}

export interface ICreateCategoryInCompetition {
  menWeights: string;
  womenWeights: string;
  unisexWeights: string;
  identifier: string; // kg / lb
  amountOverAllowed: string; // 300
  startingYear: string;
  endingYear: string;
  competition: string; // uuid
  category: number; // id
  rules: string; // add fixed list of rules to choose from
}

export interface CountryI {
  id: number;
  name: string;
  code: string;
}

export interface IClubCreate {
  name: string;
  email: string;
  country: number;
  location: string;
  image?: Blob;
}

export interface IClub {
  uuid: string;
  name: string;
  email: string;
  createdCompetitionsAmount: number;
  membersAmount: number;
  judokaAmount: number;
  isPending: boolean;
  isUserClub: boolean;
  location: string;
  image?: string;
  slug: string;
  created: Date;
  owner: number;
  country: number;
}

export interface IRole {
  id: number;
  name: string;
  short: string;
}

export interface IClubAdditionalUser {
  firstName: string;
  lastName: string;
  id: number;
  isTrainer: boolean;
  isClubOwner: boolean;
  email: string;
  userName: string;
}

export interface IClubAdditionalMember {
  id: number;
  role: IRole;
  user: IClubAdditionalUser;
  created: Date;
  club: string;
}

export interface IClubAdditionalCompetition {
  name: string;
  active: boolean;
  competitorAmount: number;
  slug: string;
  start: Date;
  end: Date;
}

export interface IClubAdditionalData {
  name: string;
  members: IClubAdditionalMember[];
  judokas: IClubJudokas[];
  competitions: IClubAdditionalCompetition[];
}

export interface ITrainer {
  id: number;
  profile: IProfile;
  last_login: Date;
  is_superuser: boolean;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  is_staff: boolean;
  is_active: boolean;
  date_joined: Date;
  groups: unknown[];
  user_permissions: unknown[];
}

export interface IClubJudokas {
  idCode: string;
  firstName: string;
  lastName: string;
  birthDay: string;
  licence: boolean;
  licenceNumber: number[];
  belt: IBelt;
  trainer: ITrainer;
  slug: string;
  image?: string | null;
  uuid: string;
  sex: string;
}

export type ISexType = 'M' | 'F';
export interface IJudokaCreate {
  idCode: string;
  firstName: string;
  lastName: string;
  sex: ISexType;
  birthDay: string;
  image?: Blob;
  slug?: string;
  club: string;
  belt: number;
}

export interface IBelt {
  id: number;
  color: string;
  value: string;
  created: Date;
}

export interface IUserPendingInClub {
  id: number;
  user: IUser;
  created: Date;
  club: string;
}
