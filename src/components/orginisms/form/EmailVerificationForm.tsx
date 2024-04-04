import React, {FC, useRef, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors} from 'constants/theme';
import Input from 'components/atoms/Input';
import Button from 'components/atoms/Button';
import Timer from 'components/atoms/Timer';
import Api from 'libs/axios/api';

type EmailVerificationFormProps = {
  onSuccess: (email: string) => void;
};

const EmailVerificationForm: FC<EmailVerificationFormProps> = ({
  onSuccess,
}: EmailVerificationFormProps) => {
  const [inputs, setInputs] = useState({email: '', code: ''});
  const [errorTexts, setErrorTexts] = useState({email: '', code: ''});
  const [isSend, setIsSend] = useState<boolean>(false);
  const isValidEmailInput = inputs.email.length > 0;
  const timerRef = useRef<any>(null);

  const handlePressSendVerificationCode = () => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(inputs.email)) {
      return setErrorTexts({
        ...errorTexts,
        email: '이메일 형식으로 입력해주세요',
      });
    }

    console.log(inputs.email);
    setIsSend(true);
  };

  const handlePressResendVerificationCode = () => {
    console.log('Resend', inputs.email);
    timerRef.current?.restart();
  };

  const handleSubmitVerificationCode = async () => {
    console.log(inputs);
    onSuccess(inputs.email);

    // await Api.login(inputs, async (response: Response) => {
    //   const { refreshToken, accessToken } = response.data;
    //   await saveTokensToStorage(refreshToken, accessToken);
    //   setInputs({ email: '', password: '' });
    // });
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
          onChangeText={value => setInputs({...inputs, email: value})}
          onTextInput={() => setErrorTexts({...errorTexts, email: ''})}
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
            onChangeText={value => setInputs({...inputs, code: value})}
            onSubmitEditing={handleSubmitVerificationCode}
          />
        )}
      </View>
      <View style={styles.buttonWrapper}>
        {!isSend ? (
          <Button
            size="l"
            disabled={!isValidEmailInput}
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
              onPress={handlePressResendVerificationCode}>
              인증코드 재전송
            </Button>
            <Button
              size="l"
              disabled={!(isValidEmailInput && inputs.code.length > 0)}
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
