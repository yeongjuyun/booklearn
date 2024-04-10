// 각 필드에 대한 유효성 검사 함수 정의
export const validationRules = {
  email: (value: string) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(value)) {
      return '이메일 형식으로 입력해주세요';
    }
    return undefined;
  },
  password: (value: string) => {
    return undefined;
  },
  passwordConfirm: (value: string) => {
    return undefined;
  },
  name: (value: string) => {
    return undefined;
  },
  nickname: (value: string) => {
    return undefined;
  },
  verificationCode: (value: string) => {
    return undefined;
  },
};
