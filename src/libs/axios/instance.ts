import {Alert} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import axios, {AxiosResponse} from 'axios';
import {Fetcher} from 'swr';
import {
  getTokensFromStorage,
  removeTokensFromStorage,
  saveAccessTokenToStorage,
} from 'libs/async-storage';
import {Request, Response, ResponseType} from 'types/common';

export const BASE_URL = 'https://api.book-worm.co.kr';

export const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
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
    // if (response.data.resultCode === '99999') {
    //   const result = await axios
    //     .get(`${BASE_URL}/auth`, {
    //       headers: {Authorization: `Bearer ${refreshToken}`},
    //     })
    //     .then(async res => {
    //       const newAccessToken = res.data.resultBody.accessToken;
    //       originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
    //       saveAccessTokenToStorage(newAccessToken);
    //       return await instance(originalRequest);
    //     })
    //     .catch(async err => {
    //       console.log('err', err);
    //       console.log('토큰 재발급 중 에러 발생', err.response.headers);
    //       await removeTokensFromStorage();
    //     });

    //   if (result) {
    //     _response = result as AxiosResponse<any, any>;
    //   }
    // }
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
  callback?: (response: Response) => void,
  navigation?: StackNavigationProp<any>,
) => {
  const response: Response = {
    type: ResponseType.FAILURE,
    code: '99999',
    message: '',
  };

  try {
    const res = await instance.get(url);
    const {type, code, data, message} = res.data;

    response.type = type;
    response.code = code;
    response.data = data;
    response.message = message || '요청 실패';

    if (typeof callback === 'function') {
      callback(response);
    }
  } catch (error) {
    response.message = `요청실패: ${error}`;
  } finally {
  }
};

export const POST = async (
  url: string,
  payload: any,
  callback?: (response: Response) => void,
  navigation?: StackNavigationProp<any>,
) => {
  const response: Response = {
    type: ResponseType.FAILURE,
    code: '99999',
    message: '',
  };

  try {
    const res = await instance.post(url, payload);
    console.log('res', res);
    const {type, code, data, message} = res.data;

    response.type = type;
    response.code = code;
    response.data = data;
    response.message = message || '요청 실패';
    if (typeof callback === 'function') {
      callback(response);
    }
  } catch (error) {
    response.message = `요청실패: ${error}`;
  } finally {
  }
};

export const DELETE = async (
  url: string,
  payload: any,
  callback?: (response: Response) => void,
  navigation?: StackNavigationProp<any>,
) => {
  const response: Response = {
    type: ResponseType.FAILURE,
    code: '99999',
    message: '',
  };

  try {
    const res = await instance.delete(url, payload);
    const {type, code, data, message} = res.data;

    response.type = type;
    response.code = code;
    response.data = data;
    response.message = message || '요청 실패';
    if (typeof callback === 'function') {
      callback(response);
    }
  } catch (error) {
    response.message = `요청실패: ${error}`;
  } finally {
  }
};

export const fetcher = <T = any>(): Fetcher<T, Request> => {
  return (payload: Request) =>
    instance({
      method: payload.method,
      url: payload.url,
      data: payload.param,
    }).then(res => res.data.data);
};
