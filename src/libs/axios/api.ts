import * as KakaoLogin from '@react-native-seoul/kakao-login';
import {saveTokensToStorage} from 'libs/async-storage';
import {Response, ResponseType} from 'types/common';
import {GET, POST} from './instance';

const authApis = {
  signinWithKakao: async (
    payload?: {},
    callback?: (response: Response) => void,
    navigation?: any,
  ) => {
    const kakaoLoginResponse = await KakaoLogin.login();
    const {accessToken} = kakaoLoginResponse;
    await POST('/users/sign-in/kakao', {accessToken}, (response: Response) => {
      console.log('kakao-response', response);
      if (response.type === ResponseType.SUCCESS) {
        const {accessToken, refreshToken} = response.data;
        saveTokensToStorage(accessToken, refreshToken);
        navigation.navigate('Home');
      } else {
        console.log('카카오 로그인 실패');
      }
    });
  },
  signinWithLocal: async (
    payload: {email: string; password: string},
    callback?: (response: Response) => void,
    navigation?: any,
  ) => {
    await POST('/users/sign-in/kakao', payload, callback, navigation);
  },
  signupWithLocal: async (
    payload: {name: string; email: string; password: string},
    callback?: (response: Response) => void,
    navigation?: any,
  ) => {
    await POST('/users/sign-up/local', payload, callback, navigation);
  },
  sendEmailVerificationCode: async (
    payload: {email: string},
    callback?: (response: Response) => void,
    navigation?: any,
  ) => {
    await POST(
      '/users/sign-up/local/send-email',
      payload,
      callback,
      navigation,
    );
  },
  verifyEmailVerificationCode: async (
    payload: {email: string},
    callback?: (response: Response) => void,
    navigation?: any,
  ) => {
    await POST(
      '/users/sign-up/local/verify-email',
      payload,
      callback,
      navigation,
    );
  },
  resetPassword: async (
    payload: {email: string},
    callback?: (response: Response) => void,
    navigation?: any,
  ) => {
    await POST('/users/reset-password', payload, callback, navigation);
  },
};

const bookApis = {
  getBooksByQuery: async (
    payload: {query: string; count: number; page: number},
    callback?: (response: Response) => void,
    navigation?: any,
  ) => {
    const {query, count, page} = payload;
    await GET(
      `/books/get-ext?query=${query}&maxResults=${count}&start${page}`,
      callback,
      navigation,
    );
  },
  getBooksBestSeller: async (
    payload?: {},
    callback?: (response: Response) => void,
    navigation?: any,
  ) => {
    await GET('/books/best-seller', callback, navigation);
  },
  getBooksNewSpecial: async (
    payload?: {},
    callback?: (response: Response) => void,
    navigation?: any,
  ) => {
    await GET('/books/new-special', callback, navigation);
  },
  getBookByIsbn: async (
    payload: {isbn: string},
    callback?: (response: Response) => void,
    navigation?: any,
  ) => {
    const {isbn} = payload;
    await GET(`/books/get-ext-isbn?isbn=${isbn}`, callback, navigation);
  },
  getBookById: async (
    payload: {id: string},
    callback?: (response: Response) => void,
    navigation?: any,
  ) => {
    const {id} = payload;
    await GET(`/books?id=${id}`, callback, navigation);
  },
};

const bookshelfApis = {
  getBookshelf: async (
    payload?: {},
    callback?: (response: Response) => void,
    navigation?: any,
  ) => {
    await GET('/bookshelf', callback, navigation);
  },
  postBookshelf: async (
    payload: {isbnList: Array<string>},
    callback?: (response: Response) => void,
    navigation?: any,
  ) => {
    await POST('/bookshelf', payload, callback, navigation);
  },
  getBookshelfById: async (
    payload: {id: string},
    callback?: (response: Response) => void,
    navigation?: any,
  ) => {
    const {id} = payload;
    await GET(`/bookshelf/${id}`, callback, navigation);
  },
  postBookEssay: async (
    payload: {id: string; content: string},
    callback?: (response: Response) => void,
    navigation?: any,
  ) => {
    const {id, content} = payload;
    await POST(`/bookshelf/${id}/essay`, {content}, callback, navigation);
  },
  postBookMemo: async (
    payload: {id: string; page: number; content: string},
    callback?: (response: Response) => void,
    navigation?: any,
  ) => {
    const {id, page, content} = payload;
    await POST(`/bookshelf/${id}/memo`, {page, content}, callback, navigation);
  },
};

const Api = {
  auth: authApis,
  book: bookApis,
  bookshelf: bookshelfApis,
};

export default Api;
