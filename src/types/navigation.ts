import {BookEssay, BookMemo} from './book';
import {Policy} from './common';

export type RootStackParamList = {
  Home: {screen?: keyof TabParamList} | undefined;
  Auth: undefined;
  Setting: undefined;
};

export type TabParamList = {
  HomeStack: undefined;
  SettingStack: undefined;
};

export type AuthStackParamList = {
  Social: undefined;
  Launch: undefined;
  Signin: undefined;
  Signup: undefined;
  PasswordFind: undefined;
};

export type BookStackParamList = {
  Bookshelf: undefined;
  Detail: {id: string};
  Search: undefined;
  Essay: {id: string; essay: BookEssay};
  EditMemo?: {id: string; bookMemo: BookMemo};
  EditEssay: {id: string; essay: BookEssay};
};

export type SettingStackParamList = {
  SettingMain: undefined;
  Profile: undefined;
  ProfileNickname: undefined;
  ProfilePassword: undefined;
  ReleaseNote: undefined;
  ReleaseNoteDetail: {title: string; content: string};
  ThemeSetting: undefined;
  Policy: undefined;
  PolicyDetail: {type: Policy};
  Inquire: undefined;
};

export type FeedStackParamList = {
  FeedMain: undefined;
  FeedDetail: undefined;
  FeedCreate: undefined;
};
