import {useRef, useState} from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {saveTokensToStorage} from 'libs/async-storage';
import Api from 'libs/axios/api';
import {ResponseType} from 'types/common';
import {AuthStackParamList, RootStackParamList} from 'types/navigation';
import {Colors} from 'constants/theme';
import Button from 'components/atoms/Button';
import Input from 'components/atoms/Input';
import Text from 'components/atoms/Text';

type SigninFormProps = {
  navigation: StackNavigationProp<RootStackParamList & AuthStackParamList>;
};

const SigninForm = ({navigation}: SigninFormProps) => {
  const passwordRef = useRef<TextInput>(null);
  const [inputs, setInputs] = useState({email: '', password: ''});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isValidForm = inputs.email.length > 0 && inputs.password.length > 0;

  const handleSubmit = async () => {
    setIsLoading(true);

    const payload = {email: inputs.email, password: inputs.password};
    await Api.auth.signinWithLocal(payload, response => {
      if (response.type === ResponseType.SUCCESS) {
        const {accessToken, refreshToken} = response.data;
        saveTokensToStorage(accessToken, refreshToken);
        setInputs({email: '', password: ''});
        navigation.navigate('Home');
      } else {
        Alert.alert('로그인 실패', response.message, [{text: '확인'}]);
      }

      setIsLoading(false);
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.base}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.form}>
          <View style={styles.inputWrapper}>
            <Input
              placeholder="이메일"
              value={inputs.email}
              maxLength={300}
              autoFocus
              onChangeText={value => setInputs({...inputs, email: value})}
              onSubmitEditing={() => passwordRef.current?.focus()}
            />
            <Input
              ref={passwordRef}
              type="password"
              placeholder="비밀번호"
              value={inputs.password}
              maxLength={30}
              onChangeText={value => setInputs({...inputs, password: value})}
              onSubmitEditing={handleSubmit}
            />
            <TouchableOpacity
              style={styles.findPasswordLink}
              onPress={() => navigation.push('PasswordFind')}>
              <Text sub>비밀번호 찾기</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Pressable
              style={styles.signupLink}
              onPress={() => navigation.push('Signup')}>
              <Text body>회원이 아니신가요? </Text>
              <Text body style={{color: Colors.primary}}>
                회원가입
              </Text>
            </Pressable>
            <Button
              size="l"
              style={styles.signinButton}
              disabled={!isValidForm}
              isLoading={isLoading}
              onPress={handleSubmit}>
              로그인
            </Button>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SigninForm;

const styles = StyleSheet.create({
  base: {flex: 1},
  form: {flex: 1, justifyContent: 'space-between', paddingHorizontal: 16},
  inputWrapper: {gap: 12},
  findPasswordLink: {
    alignSelf: 'flex-end',
  },
  signupLink: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  signinButton: {
    marginTop: 30,
    marginBottom: 16,
    backgroundColor: Colors.primary,
  },
});
