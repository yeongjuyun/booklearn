import {useRef, useState} from 'react';
import {
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
import Button from 'components/atoms/Button';
import {Colors} from 'constants/theme';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList, RootStackParamList} from 'types/navigation';
import Input from 'components/atoms/Input';
import Text from 'components/atoms/Text';

type SigninFormProps = {
  navigation: StackNavigationProp<RootStackParamList & AuthStackParamList>;
};

const SigninForm = ({navigation}: SigninFormProps) => {
  const passwordRef = useRef<TextInput>(null);
  const [inputs, setInputs] = useState({email: '', password: ''});

  const handleSubmit = async () => {
    console.log(inputs);
    navigation.navigate('Home');

    // await Api.login(inputs, async (response: Response) => {
    //   const { refreshToken, accessToken } = response.data;
    //   await saveTokensToStorage(refreshToken, accessToken);
    //   setInputs({ email: '', password: '' });
    //   navigation.navigate('Main');
    // });
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
              onPress={handleSubmit}
              disabled={
                !(inputs.email.length > 0 && inputs.password.length > 0)
              }>
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
