import * as KakaoLogin from '@react-native-seoul/kakao-login';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {
  appleAuth,
  appleAuthAndroid,
} from '@invertase/react-native-apple-authentication';
import {saveTokensToStorage} from 'libs/async-storage';
import {Response, ResponseType} from 'types/common';
import {DELETE, GET, POST, UPDATE} from './instance';
import {Alert} from 'react-native';

GoogleSignin.configure({
  webClientId:
    '647582691314-uv9kff2krc3sbqtdd7ip3ftpqkdj19cg.apps.googleusercontent.com',
});

const authApis = {
  signinWithKakao: async (
    payload?: {},
    callback?: (response: Response) => void,
    navigation?: any,
  ) => {
    try {
      const kakaoLoginResponse = await KakaoLogin.login();
      const {accessToken} = kakaoLoginResponse;
      await POST(
        '/users/sign-in/kakao',
        {accessToken},
        (response: Response) => {
          if (response.type === ResponseType.SUCCESS) {
            const {accessToken, refreshToken} = response.data;
            saveTokensToStorage(accessToken, refreshToken);
            navigation.navigate('Home');
          } else {
            Alert.alert('', response.message);
          }
        },
      );
    } catch (error) {
      console.log(error);
    }
  },
  signinWidthGoogle: async (
    payload?: {},
    callback?: (response: Response) => void,
    navigation?: any,
  ) => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const {idToken} = await GoogleSignin.signIn();
      POST('/users/sign-in/google', {idToken}, response => {
        if (response.type === ResponseType.SUCCESS) {
          const {accessToken, refreshToken} = response.data;
          saveTokensToStorage(accessToken, refreshToken);
          navigation.navigate('Home');
        } else {
          Alert.alert('', response.message);
        }
      });
    } catch (error) {
      console.log(error);
    }
  },
  signinWithAppleForIos: async (
    payload?: {},
    callback?: (response: Response) => void,
    navigation?: any,
  ) => {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });

    console.log('appleAuthRequestResponse', appleAuthRequestResponse);
    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user,
    );

    if (credentialState === appleAuth.State.AUTHORIZED) {
      if (!appleAuth.isSupported) {
        return Alert.alert(
          '애플 로그인 실패',
          '애플 로그인을 지원하지 않는 기기입니다',
          [{text: '확인'}],
        );
      }

      const {identityToken} = appleAuthRequestResponse;
      const payload = {idToken: identityToken};
      POST('/users/sign-in/apple', payload, response => {
        if (response.type === ResponseType.SUCCESS) {
          const {accessToken, refreshToken} = response.data;
          saveTokensToStorage(accessToken, refreshToken);
          navigation.navigate('Home');
        } else {
          Alert.alert('', response.message);
        }
      });
    }
  },
  signinWithAppleForAndroid: async (
    payload?: {},
    callback?: (response: Response) => void,
    navigation?: any,
  ) => {
    try {
      appleAuthAndroid.configure({
        clientId: 'com.example.client-android',
        redirectUri: 'https://example.com/auth/callback',
        scope: appleAuthAndroid.Scope.ALL,
        responseType: appleAuthAndroid.ResponseType.ALL,
        nonce: 'random-nonce',
        state: 'random-state',
      });

      const response = await appleAuthAndroid.signIn();
      if (response) {
        const id_token = response.id_token;

        const payload = {idToken: id_token};
        POST('/users/sign-in/apple', payload, response => {
          if (response.type === ResponseType.SUCCESS) {
            const {accessToken, refreshToken} = response.data;
            saveTokensToStorage(accessToken, refreshToken);
            navigation.navigate('Home');
          } else {
            Alert.alert('', response.message);
          }
        });
      }
    } catch (error: any) {
      if (error && error.message) {
        Alert.alert('애플 로그인 실패', error.message, [{text: '확인'}]);
      }
    }
  },
  signinWithLocal: async (
    payload: {email: string; password: string},
    callback?: (response: Response) => void,
    navigation?: any,
  ) => {
    await POST('/users/sign-in/local', payload, callback, navigation);
  },
  signupWithLocal: async (
    payload: {name: string; email: string; password: string},
    callback?: (response: Response) => void,
    navigation?: any,
  ) => {
    await POST('/users/sign-up/local', payload, callback, navigation);
  },
  sendEmailVerificationCode: async (
    payload: {email: string; isSignUp: boolean},
    callback?: (response: Response) => void,
    navigation?: any,
  ) => {
    await POST('/auth/send-email', payload, callback, navigation);
  },
  verifyEmailVerificationCode: async (
    payload: {email: string; code: string},
    callback?: (response: Response) => void,
    navigation?: any,
  ) => {
    await POST('/auth/verify-email', payload, callback, navigation);
  },
  resetPassword: async (
    payload: {email: string},
    callback?: (response: Response) => void,
    navigation?: any,
  ) => {
    await POST('/users/reset-password', payload, callback, navigation);
  },
};

const defaultApis = {
  getTermsOfService: async (
    payload?: {},
    callback?: (response: Response) => void,
    navigation?: any,
  ) => {
    await GET('/terms-of-service', callback, navigation);
  },
  getPrivacyPolicy: async (
    payload?: {},
    callback?: (response: Response) => void,
    navigation?: any,
  ) => {
    await GET('/privacy-policy', callback, navigation);
  },
  getReleaseNotes: async (
    payload?: {},
    callback?: (response: Response) => void,
    navigation?: any,
  ) => {
    await GET('/release-notes', callback, navigation);
  },
  getAppVersions: async (
    payload?: {},
    callback?: (response: Response) => void,
    navigation?: any,
  ) => {
    await GET('/app-versions', callback, navigation);
  },
};

const userApis = {
  getUser: async (
    payload?: {},
    callback?: (response: Response) => void,
    navigation?: any,
  ) => {
    await GET('/auth/me', callback, navigation);
  },
  updateNickname: async (
    payload: {name: string},
    callback?: (response: Response) => void,
    navigation?: any,
  ) => {
    await UPDATE('/users/name', payload, callback, navigation);
  },
  updatePassword: async (
    payload: {password: string},
    callback?: (response: Response) => void,
    navigation?: any,
  ) => {
    await UPDATE('/users/password', payload, callback, navigation);
  },
  deleteUser: async (
    payload?: {},
    callback?: (response: Response) => void,
    navigation?: any,
  ) => {
    await DELETE('/users', undefined, callback, navigation);
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
    payload: {bookshelfId: string},
    callback?: (response: Response) => void,
    navigation?: any,
  ) => {
    const {bookshelfId} = payload;
    await GET(`/bookshelf/${bookshelfId}`, callback, navigation);
  },
  postBookEssay: async (
    payload: {bookshelfId: string; content: string},
    callback?: (response: Response) => void,
    navigation?: any,
  ) => {
    const {bookshelfId, content} = payload;
    await POST(
      `/bookshelf/${bookshelfId}/essay`,
      {content},
      callback,
      navigation,
    );
  },
  postBookMemo: async (
    payload: {bookshelfId: string; page: number; content: string},
    callback?: (response: Response) => void,
    navigation?: any,
  ) => {
    const {bookshelfId, page, content} = payload;
    await POST(
      `/bookshelf/${bookshelfId}/memo`,
      {page, content},
      callback,
      navigation,
    );
  },
  patchBookMemo: async (
    payload: {
      bookshelfId: string;
      memoId: string;
      page: number;
      content: string;
    },
    callback?: (response: Response) => void,
    navigation?: any,
  ) => {
    const {bookshelfId, memoId, ...requestBody} = payload;
    await UPDATE(
      `/bookshelf/${bookshelfId}/memo/${memoId}`,
      requestBody,
      callback,
      navigation,
    );
  },
  patchBookEssay: async (
    payload: {bookshelfId: string; essayId: string; content: string},
    callback?: (response: Response) => void,
    navigation?: any,
  ) => {
    const {bookshelfId, essayId, ...requestBody} = payload;
    await UPDATE(
      `/bookshelf/${bookshelfId}/essay/${essayId}`,
      requestBody,
      callback,
      navigation,
    );
  },
  deleteBookMemoById: async (
    payload: {bookshelfId: string; memoId: string},
    callback?: (response: Response) => void,
    navigation?: any,
  ) => {
    const {bookshelfId, memoId} = payload;
    await DELETE(
      `/bookshelf/${bookshelfId}/memo/${memoId}`,
      {},
      callback,
      navigation,
    );
  },
  deleteBookshelfById: async (
    payload: {id: string},
    callback?: (response: Response) => void,
    navigation?: any,
  ) => {
    const {id} = payload;
    await DELETE(`/bookshelf/${id}`, {}, callback, navigation);
  },
  deleteBookEssayById: async (
    payload: {bookshelfId: string; essayId: string},
    callback?: (response: Response) => void,
    navigation?: any,
  ) => {
    const {bookshelfId, essayId} = payload;
    await DELETE(
      `/bookshelf/${bookshelfId}/essay/${essayId}`,
      {},
      callback,
      navigation,
    );
  },
};

const Api = {
  default: defaultApis,
  auth: authApis,
  user: userApis,
  book: bookApis,
  bookshelf: bookshelfApis,
};

export default Api;
