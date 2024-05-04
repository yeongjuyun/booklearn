import {StackNavigationProp} from '@react-navigation/stack';
import {ResponseType, Response} from 'types/common';
import {instance} from './instance';

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

export const UPDATE = async (
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
    const res = await instance.patch(url, payload);
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
