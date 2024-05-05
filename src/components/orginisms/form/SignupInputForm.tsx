import React, {useRef, useState} from 'react';
import {View, StyleSheet, TextInput, Alert} from 'react-native';
import useSWR from 'swr';
import {StackNavigationProp} from '@react-navigation/stack';
import Api from 'libs/axios/api';
import {ResponseType} from 'types/common';
import {AuthStackParamList} from 'types/navigation';
import {SWR_KEY} from 'constants/swrKey';
import {Colors} from 'constants/theme';
import useInputs from 'hooks/useInputs';
import Input from 'components/atoms/Input';
import Button from 'components/atoms/Button';

type SignupInputFormProps = {
  navigation: StackNavigationProp<AuthStackParamList>;
};

const SignupInputForm: React.FC<SignupInputFormProps> = ({navigation}) => {
  const {data: auth_signup_email_data, mutate: auth_signup_email_mutate} =
    useSWR(SWR_KEY.auth.signup.verify.email);
  const {mutate: auth_verify_done_mutate} = useSWR(
    SWR_KEY.auth.signup.verify.done,
  );

  const {values, errors, isValidLength, handleChange, clearInputs, setError} =
    useInputs({
      nickname: '',
      password: '',
      passwordConfirm: '',
    });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const nicknameInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const passwordConfirmInputRef = useRef<TextInput>(null);

  const handlePressSignup = () => {
    const {nickname, password, passwordConfirm} = values;
    if (password.length < 8) {
      passwordInputRef.current?.focus();
      return setError('password', '비밀번호를 8자 이상 입력해주세요');
    }

    if (password !== passwordConfirm) {
      passwordConfirmInputRef.current?.focus();
      return setError('passwordConfirm', '비밀번호가 일치하지 않습니다');
    }

    const payload = {
      name: nickname,
      email: auth_signup_email_data,
      password: password,
    };

    setIsLoading(true);
    Api.auth.signupWithLocal(payload, response => {
      if (response.type === ResponseType.SUCCESS) {
        clearInputs();
        Alert.alert('회원가입 완료', '회원가입이 완료되었습니다', [
          {text: '확인', onPress: () => navigation.navigate('Signin')},
        ]);
      } else {
        Alert.alert('회원가입 실패', response.message, [{text: '확인'}]);
      }
      auth_signup_email_mutate(undefined);
      auth_verify_done_mutate(undefined);
      setIsLoading(false);
    });
  };

  return (
    <View style={styles.form}>
      <View style={styles.inputWrapper}>
        <Input
          ref={nicknameInputRef}
          value={values.nickname}
          maxLength={30}
          placeholder="닉네임"
          autoFocus
          errorText={errors.nickname}
          onChangeText={text => handleChange('nickname', text)}
          onSubmitEditing={() => passwordInputRef.current?.focus()}
        />
        <Input
          ref={passwordInputRef}
          type={'password'}
          value={values.password}
          maxLength={30}
          placeholder="비밀번호"
          errorText={errors.password}
          onChangeText={text => handleChange('password', text)}
          onSubmitEditing={() => passwordConfirmInputRef.current?.focus()}
        />
        <Input
          ref={passwordConfirmInputRef}
          type={'password'}
          value={values.passwordConfirm}
          maxLength={30}
          placeholder="비밀번호 확인"
          errorText={errors.passwordConfirm}
          onChangeText={text => handleChange('passwordConfirm', text)}
          onSubmitEditing={handlePressSignup}
        />
      </View>
      <Button
        size="l"
        disabled={
          !(
            isValidLength.nickname &&
            isValidLength.password &&
            isValidLength.passwordConfirm
          )
        }
        isLoading={isLoading}
        style={styles.verificationButton}
        onPress={handlePressSignup}>
        회원가입
      </Button>
    </View>
  );
};

export default SignupInputForm;

const styles = StyleSheet.create({
  form: {flex: 1, justifyContent: 'space-between', paddingHorizontal: 16},
  inputWrapper: {gap: 12},
  verificationButton: {marginBottom: 16, backgroundColor: Colors.primary},
});
