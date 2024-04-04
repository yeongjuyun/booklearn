import React, {useRef, useState} from 'react';
import {View, StyleSheet, TextInput, Alert} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from 'types/navigation';
import {Colors} from 'constants/theme';
import Input from 'components/atoms/Input';
import Button from 'components/atoms/Button';

type SignupInputFormProps = {
  navigation: StackNavigationProp<AuthStackParamList>;
  email: string;
};

const SignupInputForm: React.FC<SignupInputFormProps> = ({
  navigation,
  email,
}) => {
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

  const nicknameInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const passwordConfirmInputRef = useRef<TextInput>(null);

  const handlePressSignup = () => {
    const {nickname, password, passwordConfirm} = inputs;
    if (password.length < 8) {
      passwordInputRef.current?.focus();
      setErrorTexts({
        ...errorTexts,
        password: '비밀번호를 8자 이상 입력하세요',
      });
      return;
    }
    if (password !== passwordConfirm) {
      passwordConfirmInputRef.current?.focus();
      setErrorTexts({
        ...errorTexts,
        passwordConfirm: '비밀번호가 일치하지 않습니다',
      });
      return;
    }
    // if (nickname) {
    // passwordConfirmInputRef.current?.focus();
    // return setErrorTexts({ ...errorTexts, nickname: '이미 사용중인 닉네임입니다' });
    // }

    console.log('Signup', email, inputs);
    Alert.alert('회원가입 완료', '회원가입이 완료되었습니다', [
      {text: '확인', onPress: () => navigation.navigate('Signin')},
    ]);
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
          onTextInput={() => setErrorTexts({...errorTexts, nickname: ''})}
          onChangeText={value => setInputs({...inputs, nickname: value})}
          onSubmitEditing={() => passwordInputRef.current?.focus()}
        />
        <Input
          ref={passwordInputRef}
          type={'password'}
          value={inputs.password}
          maxLength={30}
          placeholder="비밀번호"
          errorText={errorTexts.password}
          onTextInput={() => setErrorTexts({...errorTexts, password: ''})}
          onChangeText={value => setInputs({...inputs, password: value})}
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
