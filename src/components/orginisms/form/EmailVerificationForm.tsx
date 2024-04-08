import React, {FC, useRef, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import useSWR from 'swr';
import Api from 'libs/axios/api';
import {ResponseType} from 'types/common';
import {SWR_KEY} from 'constants/swrKey';
import {Colors} from 'constants/theme';
import Input from 'components/atoms/Input';
import Button from 'components/atoms/Button';
import Timer from 'components/atoms/Timer';

type EmailVerificationFormProps = {
  isSignup: boolean;
  onSuccessEmailVerification?: () => void;
};

const EmailVerificationForm: FC<EmailVerificationFormProps> = ({
  isSignup,
  onSuccessEmailVerification,
}: EmailVerificationFormProps) => {
  const {mutate: auth_verify_email_mutate} = useSWR(SWR_KEY.auth.verify.email);

  const [inputs, setInputs] = useState({email: '', code: ''});
  const [errorTexts, setErrorTexts] = useState({email: '', code: ''});
  const [isSend, setIsSend] = useState<boolean>(false);
  const timerRef = useRef<any>(null);

  const [isLoadingSendEmail, setIsLoadingSendEmail] = useState<boolean>(false);
  const [isLoadingVerifyEmail, setIsLoadingVerifyEmail] =
    useState<boolean>(false);

  const isValidEmailInput = inputs.email.length > 0;

  const sendEmailVerificationCode = async (onSuccess: () => void) => {
    setIsLoadingSendEmail(true);

    const payload = {email: inputs.email, isSignUp: isSignup};
    await Api.auth.sendEmailVerificationCode(payload, response => {
      if (response.type === ResponseType.SUCCESS) {
        onSuccess();
      } else {
        setErrorTexts({
          ...errorTexts,
          email: response.message,
        });
      }

      setIsLoadingSendEmail(false);
    });
  };

  const handlePressSendVerificationCode = async () => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(inputs.email)) {
      return setErrorTexts({
        ...errorTexts,
        email: '이메일 형식으로 입력해주세요',
      });
    }

    sendEmailVerificationCode(() => setIsSend(true));
  };

  const handlePressResendVerificationCode = () => {
    sendEmailVerificationCode(() => timerRef.current?.restart());
  };

  const handleSubmitVerificationCode = async () => {
    setIsLoadingVerifyEmail(true);

    const payload = {email: inputs.email, code: inputs.code};
    Api.auth.verifyEmailVerificationCode(payload, response => {
      if (response.type === ResponseType.SUCCESS) {
        auth_verify_email_mutate(inputs.email);
        if (onSuccessEmailVerification) {
          onSuccessEmailVerification();
        }
      } else {
        setErrorTexts({
          ...errorTexts,
          code: response.message,
        });
      }

      setIsLoadingVerifyEmail(false);
    });
  };

  return (
    <View style={styles.form}>
      <View style={styles.inputWrapper}>
        <Input
          type={'email'}
          placeholder="이메일"
          value={inputs.email}
          maxLength={300}
          autoFocus
          blurOnSubmit={false}
          isDisabled={isSend}
          errorText={errorTexts.email}
          onChangeText={value => {
            setInputs({...inputs, email: value});
            setErrorTexts({...errorTexts, email: ''});
          }}
          onSubmitEditing={handlePressSendVerificationCode}
        />
        {isSend && (
          <Input
            placeholder="인증코드"
            value={inputs.code}
            maxLength={30}
            autoFocus
            blurOnSubmit={false}
            endContent={
              <Timer ref={timerRef} duration={300000} autoStart={isSend} />
            }
            errorText={errorTexts.code}
            onChangeText={value => {
              setInputs({...inputs, code: value});
              setErrorTexts({...errorTexts, code: ''});
            }}
            onSubmitEditing={handleSubmitVerificationCode}
          />
        )}
      </View>
      <View style={styles.buttonWrapper}>
        {!isSend ? (
          <Button
            size="l"
            disabled={!isValidEmailInput}
            isLoading={isLoadingSendEmail}
            style={styles.verificationButton}
            onPress={handlePressSendVerificationCode}>
            인증코드 발송
          </Button>
        ) : (
          <>
            <Button
              size="l"
              textStyle={{color: Colors.primary}}
              style={styles.resendButton}
              disabled={!isValidEmailInput}
              isLoading={isLoadingSendEmail}
              onPress={handlePressResendVerificationCode}>
              인증코드 재전송
            </Button>
            <Button
              size="l"
              disabled={!(isValidEmailInput && inputs.code.length > 0)}
              isLoading={isLoadingVerifyEmail}
              style={styles.verificationButton}
              onPress={handleSubmitVerificationCode}>
              인증하기
            </Button>
          </>
        )}
      </View>
    </View>
  );
};

export default EmailVerificationForm;

const styles = StyleSheet.create({
  form: {flex: 1, justifyContent: 'space-between', paddingHorizontal: 16},
  inputWrapper: {gap: 12},
  buttonWrapper: {gap: 10},
  resendButton: {backgroundColor: 'transparent'},
  verificationButton: {backgroundColor: Colors.primary, marginBottom: 16},
});
