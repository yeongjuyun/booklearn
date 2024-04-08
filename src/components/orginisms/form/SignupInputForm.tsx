import React, {useRef, useState} from 'react';
import {View, StyleSheet, TextInput, Alert} from 'react-native';
import useSWR from 'swr';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from 'types/navigation';
import {SWR_KEY} from 'constants/swrKey';
import {Colors} from 'constants/theme';
import Input from 'components/atoms/Input';
import Button from 'components/atoms/Button';
import Api from 'libs/axios/api';
import {ResponseType} from 'types/common';

type SignupInputFormProps = {
  navigation: StackNavigationProp<AuthStackParamList>;
};

const SignupInputForm: React.FC<SignupInputFormProps> = ({navigation}) => {
  const {data: auth_signup_email_data, mutate: auth_signup_email_mutate} =
    useSWR(SWR_KEY.auth.verify.email);

  const [inputs, setInputs] = useState({
    nickname: '',
    password: '',
    passwordConfirm: '',
  });

  const [errorTexts, setErrorTexts] = useState({
    nickname: '',
    password: '',
    passwordConfirm: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const nicknameInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const passwordConfirmInputRef = useRef<TextInput>(null);

  const handlePressSignup = () => {
    const {nickname, password, passwordConfirm} = inputs;
    if (nickname.length < 1) {
      nicknameInputRef.current?.focus();
      return setErrorTexts({
        ...errorTexts,
        nickname: '닉네임을 입력해주세요',
      });
    }

    if (password.length < 8) {
      passwordInputRef.current?.focus();
      return setErrorTexts({
        ...errorTexts,
        password: '비밀번호를 8자 이상 입력해주세요',
      });
    }

    if (password !== passwordConfirm) {
      passwordConfirmInputRef.current?.focus();
      return setErrorTexts({
        ...errorTexts,
        passwordConfirm: '비밀번호가 일치하지 않습니다',
      });
    }

    const payload = {
      name: inputs.nickname,
      email: auth_signup_email_data,
      password: inputs.password,
    };

    setIsLoading(true);
    Api.auth.signupWithLocal(payload, response => {
      if (response.type === ResponseType.SUCCESS) {
        Alert.alert('회원가입 완료', '회원가입이 완료되었습니다', [
          {text: '확인', onPress: () => navigation.navigate('Signin')},
        ]);
      } else {
        Alert.alert('회원가입 실패', response.message, [{text: '확인'}]);
      }
      auth_signup_email_mutate(undefined);
      setIsLoading(false);
    });
  };

  return (
    <View style={styles.form}>
      <View style={styles.inputWrapper}>
        <Input
          ref={nicknameInputRef}
          value={inputs.nickname}
          maxLength={30}
          placeholder="닉네임"
          autoFocus
          errorText={errorTexts.nickname}
          onChangeText={value => setInputs({...inputs, nickname: value})}
          onTextInput={() => setErrorTexts({...errorTexts, nickname: ''})}
          onSubmitEditing={() => passwordInputRef.current?.focus()}
        />
        <Input
          ref={passwordInputRef}
          type={'password'}
          value={inputs.password}
          maxLength={30}
          placeholder="비밀번호"
          errorText={errorTexts.password}
          onChangeText={value => setInputs({...inputs, password: value})}
          onTextInput={() => setErrorTexts({...errorTexts, password: ''})}
          onSubmitEditing={() => passwordConfirmInputRef.current?.focus()}
        />
        <Input
          ref={passwordConfirmInputRef}
          type={'password'}
          value={inputs.passwordConfirm}
          maxLength={30}
          placeholder="비밀번호 확인"
          errorText={errorTexts.passwordConfirm}
          onTextInput={() =>
            setErrorTexts({...errorTexts, passwordConfirm: ''})
          }
          onChangeText={value => setInputs({...inputs, passwordConfirm: value})}
          onSubmitEditing={handlePressSignup}
        />
      </View>
      <Button
        size="l"
        disabled={
          !(
            inputs.nickname.length > 0 &&
            inputs.password.length > 0 &&
            inputs.passwordConfirm.length > 0
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
