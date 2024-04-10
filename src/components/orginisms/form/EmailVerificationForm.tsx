import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import useSWR from 'swr';
import Api from 'libs/axios/api';
import {ResponseType} from 'types/common';
import {SWR_KEY} from 'constants/swrKey';
import useInputs from 'hooks/useInputs';
import {validationRules} from 'utils/validation';
import {Colors} from 'constants/theme';
import Input from 'components/atoms/Input';
import Button from 'components/atoms/Button';
import Timer from 'components/atoms/Timer';

type EmailVerificationFormProps = {
  isSignup?: boolean;
  onSuccessVerification?: () => void;
};

const EmailVerificationForm = forwardRef<any, EmailVerificationFormProps>(
  (
    {isSignup = false, onSuccessVerification}: EmailVerificationFormProps,
    ref,
  ) => {
    const {mutate: auth_verify_email_mutate} = useSWR(
      SWR_KEY.auth.verify.email,
    );
    const {mutate: auth_verify_done_mutate} = useSWR(SWR_KEY.auth.verify.done);

    const {
      values,
      errors,
      isValidLength,
      handleChange,
      handleBlur,
      clearInputs,
      setError,
    } = useInputs({email: '', verificationCode: ''}, validationRules);

    const [isSend, setIsSend] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const timerRef = useRef<any>(null);

    useImperativeHandle(ref, () => ({
      getEmail: () => values.email,
      clearInputs: () => clearInputs(),
    }));

    const handlePressSendVerificationCode = () => {
      sendVerificationCode(() => setIsSend(true));
    };

    const handlePressResendVerificationCode = () => {
      sendVerificationCode(() => timerRef.current?.restart());
    };

    const sendVerificationCode = (onSuccess: () => void) => {
      const validationError = handleBlur('email');
      if (typeof validationError === 'string') {
        return;
      }

      setIsLoading(true);

      const payload = {email: values.email, isSignUp: !!isSignup};
      Api.auth.sendEmailVerificationCode(payload, response => {
        if (response.type === ResponseType.SUCCESS) {
          auth_verify_email_mutate(values.email);
          onSuccess();
        } else {
          setError('email', response.message);
        }

        setIsLoading(false);
      });
    };

    const handleSubmitVerificationCode = () => {
      setIsLoading(true);

      const payload = {email: values.email, code: values.verificationCode};
      Api.auth.verifyEmailVerificationCode(payload, response => {
        if (response.type === ResponseType.SUCCESS) {
          onSuccessVerification?.();
          auth_verify_done_mutate(true);
        } else {
          setError('verificationCode', response.message);
        }
        setIsLoading(false);
      });
    };

    return (
      <View style={styles.form}>
        <View style={styles.inputWrapper}>
          <Input
            type="email"
            placeholder="이메일"
            value={values.email}
            maxLength={300}
            autoFocus
            blurOnSubmit={false}
            isDisabled={isSend}
            errorText={errors.email}
            onChangeText={text => handleChange('email', text)}
            onSubmitEditing={handlePressSendVerificationCode}
          />
          {isSend && (
            <Input
              placeholder="인증코드"
              value={values.verificationCode}
              maxLength={30}
              autoFocus
              blurOnSubmit={false}
              endContent={
                <Timer ref={timerRef} duration={300000} autoStart={isSend} />
              }
              errorText={errors.verificationCode}
              onChangeText={text => handleChange('verificationCode', text)}
              onSubmitEditing={handleSubmitVerificationCode}
            />
          )}
        </View>
        <View style={styles.buttonWrapper}>
          {!isSend ? (
            <Button
              size="l"
              disabled={!isValidLength.email}
              isLoading={isLoading}
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
                disabled={!isValidLength.email}
                isLoading={isLoading}
                onPress={handlePressResendVerificationCode}>
                인증코드 재전송
              </Button>
              <Button
                size="l"
                style={styles.verificationButton}
                disabled={
                  !(isValidLength.email && isValidLength.verificationCode)
                }
                isLoading={isLoading}
                onPress={handleSubmitVerificationCode}>
                인증하기
              </Button>
            </>
          )}
        </View>
      </View>
    );
  },
);

export default EmailVerificationForm;

const styles = StyleSheet.create({
  form: {flex: 1, justifyContent: 'space-between', paddingHorizontal: 16},
  inputWrapper: {gap: 12},
  buttonWrapper: {gap: 10},
  resendButton: {backgroundColor: 'transparent'},
  verificationButton: {backgroundColor: Colors.primary, marginBottom: 16},
});
