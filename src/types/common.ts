/**
 * 응답 타입
 *
 * 1). 성공
 * 2). 실패
 * 3). 초기화
 */
export enum ResponseType {
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
  INITIAL = 'INITIAL',
}

// [API] 요청
export type Request = {
  method: string;
  url: string;
  param?: any;
};

// [API] 응답
export type Response = {
  type: ResponseType;
  data?: any;
  code: string;
  message: string;
};

// 정책
export enum Policy {
  TERMS_OF_SERVICE = 0,
  PRIVACY_POLICY = 1,
}

// 로그인 타입
export enum SigninProviderType {
  GOOGLE = 'google',
  KAKAO = 'kakao',
  APPLE = 'apple',
  LOCAL = 'local',
}

export type ReleaseNote = {
  id: string | number;
  version: string;
  date: string;
  title: string;
  content: string;
};

export type AuthType = {
  userId: string;
  password: string;
};

export type HistorySearchType = {
  startDateTime: string;
  endDateTime: string;
  perPage: number;
  currentPage: number;
};

export type ResultType<T = undefined> =
  | {
      resultStatus: boolean;
      resultMsg: string;
      resultBody: T;
    }
  | {
      resultStatus: boolean;
      resultMsg: string;
      resultBody?: T;
    };

export type tokenType = {
  accessToken?: string;
  refreshToken?: string;
};

export type InferenceType = {
  product: string;
  similarity: string | number;
  originImage: string | null | undefined;
  drawings: Array<string>;
  similarModel?: {
    name?: string;
    applicationNumber?: string;
    applicationDate?: string;
    expirationDate?: string;
    owner?: {
      name: string;
      address: string;
    };
    agent?: {
      name: string;
      address: string;
    };
  };
};

export type HistoryType = {
  id: string;
  image: string;
  product: string;
  similarity: string | number;
  createdAt: string;
};

export type SimilarModelType = {
  name: string;
  applicationNumber: string;
  applicationDate: string;
  expirationDate: string;
  agent: {address: string; name: string};
  owner: {address: string; name: string};
};
