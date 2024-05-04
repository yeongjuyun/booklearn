import {Alert} from 'react-native';
import axios, {AxiosResponse} from 'axios';
import {
  getTokensFromStorage,
  removeTokensFromStorage,
  saveAccessTokenToStorage,
} from 'libs/async-storage';

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
    // 토큰 만료 에러
    if (response.data.code === 'JE001') {
      console.log('토큰 재발급');
      const result = await axios
        .post(`${BASE_URL}/auth/refresh`, {
          headers: {Authorization: `Bearer ${refreshToken}`},
        })
        .then(async res => {
          const newAccessToken = res.data.data.accessToken;
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          saveAccessTokenToStorage(newAccessToken);
          return await instance(originalRequest);
        })
        .catch(async err => {
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
