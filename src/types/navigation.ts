import {BookEssay, BookMemo} from './book';
import {Policy} from './common';

// export enum RootNavigation {
//   SIGNUP = 'Signup',
//   LOGIN = 'Login',
//   HOME = 'Home',
// }

// export enum StackNavigation {
//   MAIN = 'Main',
//   ANALYSIS = 'Analysis',
//   RESULT = 'Result',
//   HISTORY = 'History',
//   DETAIL = 'Detail',
// }

// export type HomeStackParamList = {
//   Main: { mode?: 'camera' | 'gallery' } | undefined;
//   Result: { result: any; stack: StackNavigation.RESULT } | undefined;
//   Detail: { result: any; stack: StackNavigation.DETAIL } | undefined;
// };

export type RootStackParamList = {
  Home: {screen?: keyof TabParamList} | undefined;
  Auth: undefined;
  Setting: undefined;
};

export type AuthStackParamList = {
  Main: undefined;
  Launch: undefined;
  Signin: undefined;
  Signup: undefined;
  PasswordFind: undefined;
};

export type FeedStackParamList = {
  FeedMain: undefined;
  FeedDetail: undefined;
  FeedCreate: undefined;
};

export type BookStackParamList = {
  Main: undefined;
  Detail: {id: string};
  Search: undefined;
  Essay: {id: string; essay: BookEssay};
  EditMemo?: {id: string; bookMemo: BookMemo};
  EditEssay: {id: string; essay: BookEssay};
};

export type SearchStackParamList = {
  Main: undefined;
  Search: undefined;
  Result: undefined;
  Detail: undefined;
};

export type SettingStackParamList = {
  Main: undefined;
  Profile: undefined;
  ProfileNickname: undefined;
  ProfilePassword: undefined;
  ReleaseNote: undefined;
  ReleaseNoteDetail: {title: string; content: string};
  ThemeSetting: undefined;
  Policy: undefined;
  PolicyDetail: {type: Policy};
};

export type TabParamList = {
  HomeStack: undefined;
  SettingStack: undefined;
};
