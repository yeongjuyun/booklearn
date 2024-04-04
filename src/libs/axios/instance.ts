import axios, {AxiosResponse} from 'axios';
import {Response, ResponseType} from 'types/common';
import {Alert, ToastAndroid} from 'react-native';
// import { getTokensFromStorage, removeTokensFromStorage } from '../utils/auth';
// import { saveAccessTokenToStorage } from '../utils/auth';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  getTokensFromStorage,
  removeTokensFromStorage,
  saveAccessTokenToStorage,
} from 'libs/async-storage';

export const BASE_URL = 'https://api.book-worm.co.kr';

export const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 3000,
  withCredentials: true,
});
// 요청 인터셉터
instance.interceptors.request.use(
  async config => {
    const {accessToken} = await getTokensFromStorage();
    if (!config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => {
    console.error(error);
  },
);

// 응답 인터셉터
instance.interceptors.response.use(
  async response => {
    const originalRequest = response.config;
    const {refreshToken} = await getTokensFromStorage();
    let _response = response;
    if (response.data.resultCode === '010') {
      const result = await axios
        .get(`${BASE_URL}/auth`, {
          headers: {Authorization: `Bearer ${refreshToken}`},
        })
        .then(async res => {
          const newAccessToken = res.data.resultBody.accessToken;
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          saveAccessTokenToStorage(newAccessToken);
          return await instance(originalRequest);
        })
        .catch(async err => {
          console.log('err', err);
          console.log('토큰 재발급 중 에러 발생', err.response.headers);
          await removeTokensFromStorage();
        });

      if (result) {
        _response = result as AxiosResponse<any, any>;
      }
    }
    return _response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          console.error('ERROR', error.response.data.details);
          break;
        case 401:
          console.error('ERROR', error.response.data.details);
          break;
        case 403:
          console.error('Unauthorized', error.response.data.details);
          break;
        case 422:
          console.error(
            'ERROR 요청 값 필드명, 타입 확인',
            error.response.data.details,
          );
          break;
        case 500:
          console.error('ERROR', error.response.data.details);
          break;
        default:
          break;
      }
    } else {
      console.error('SERVER IS NOT RUNNING', error.message);
    }
    Alert.alert('[API] ' + error.message);
    return Promise.reject(error);
  },
);

export const GET = async (
  url: string,
  onSuccess?: (response: Response) => void,
  navigation?: StackNavigationProp<any>,
) => {
  const response: Response = {
    type: ResponseType.FAILURE,
    code: '99999',
  };

  try {
    const res = await instance.get(url);
    const {type, code, data, message} = res.data;

    response.type = type;
    response.code = code;
    response.data = data;
    response.message = message;

    if (typeof onSuccess === 'function') {
      onSuccess(response);
    }
  } catch (error) {
    response.message = `요청실패: ${error}`;
  } finally {
  }
};

export const POST = async (
  url: string,
  payload: any,
  onSuccess?: (response: Response) => void,
  navigation?: StackNavigationProp<any>,
) => {
  const response: Response = {
    type: ResponseType.FAILURE,
    code: '010',
  };

  try {
    const res = await instance.post(url, payload);
    const {type, code, data, message} = res.data;

    response.type = type;
    response.code = code;
    response.data = data;
    response.message = message;
    // checkResultCode(response, navigation);
    if (typeof onSuccess === 'function') {
      onSuccess(response);
    }
  } catch (error) {
    response.message = `요청실패: ${error}`;
  } finally {
  }
};

// export const checkResultCode = (response: Response, navigation?: StackNavigationProp<any>) => {
//   switch (response.code) {
//     case ErrorCodeType.LOGIN_EXPIRE: {
//       response.type = ResponseType.FAILURE;
//       ToastAndroid.show('로그인 정보가 만료되었습니다.', ToastAndroid.SHORT);
//       //   navigation && navigation.navigate(RootNavigation.LOGIN);
//       break;
//     }
//     case ErrorCodeType.SIGNUP_FAILURE: {
//       response.type = ResponseType.FAILURE;
//       ToastAndroid.show('이미 가입된 아이디입니다.', ToastAndroid.SHORT);
//       break;
//     }
//     case ErrorCodeType.INVALID_ID: {
//       response.type = ResponseType.FAILURE;
//       ToastAndroid.show('로그인 정보가 올바르지 않습니다.', ToastAndroid.SHORT);
//       break;
//     }
//     case ErrorCodeType.INVALID_PASSWORD: {
//       response.type = ResponseType.FAILURE;
//       ToastAndroid.show('비밀번호가 올바르지 않습니다.', ToastAndroid.SHORT);
//       break;
//     }
//     // inference
//     case ErrorCodeType.INFERENCE_FAILURE: {
//       response.type = ResponseType.FAILURE;
//       ToastAndroid.show('사진 분석이 실패했습니다.', ToastAndroid.SHORT);
//       break;
//     }
//     // history
//     case ErrorCodeType.HISTORY_FAILURE: {
//       response.type = ResponseType.FAILURE;
//       ToastAndroid.show('히스토리 조회에 실패했습니다.', ToastAndroid.SHORT);
//       break;
//     }
//     // history/detail
//     case ErrorCodeType.HISTORY_DETAIL_FAILURE: {
//       response.type = ResponseType.FAILURE;
//       ToastAndroid.show('상세정보 조회에 실패했습니다.', ToastAndroid.SHORT);
//       break;
//     }
//   }
// };
