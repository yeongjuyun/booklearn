import {useRef, useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import Api from 'libs/axios/api';
import {ResponseType} from 'types/common';
import {SettingStackParamList} from 'types/navigation';
import {Colors} from 'constants/theme';
import Button from 'components/atoms/Button';
import Input from 'components/atoms/Input';

type ProfileChangePasswordFormProps = {
  navigation: StackNavigationProp<SettingStackParamList>;
};

const ProfileChangePasswordForm = ({
  navigation,
}: ProfileChangePasswordFormProps) => {
  const [inputs, setInputs] = useState<{
    password: string;
    passwordConfirm: string;
  }>({
    password: '',
    passwordConfirm: '',
  });

  const [errorTexts, setErrorTexts] = useState({
    password: '',
    passwordConfirm: '',
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const passwordInputRef = useRef<TextInput>(null);
  const passwordConfirmInputRef = useRef<TextInput>(null);

  const handlePressSubmit = async () => {
    const {password, passwordConfirm} = inputs;

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

    setIsLoading(true);

    const payload = {password: inputs.password};
    await Api.user.updatePassword(payload, response => {
      if (response.type === ResponseType.SUCCESS) {
        navigation.navigate('Profile');
      } else {
        Alert.alert('요청 실패', response.message);
      }

      setIsLoading(false);
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.base}>
      <View style={styles.form}>
        <View style={styles.inputWrapper}>
          <Input
            ref={passwordInputRef}
            type={'password'}
            value={inputs.password}
            maxLength={30}
            placeholder="새 비밀번호"
            autoFocus={true}
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
            placeholder="새 비밀번호 확인"
            errorText={errorTexts.passwordConfirm}
            onTextInput={() =>
              setErrorTexts({...errorTexts, passwordConfirm: ''})
            }
            onChangeText={value =>
              setInputs({...inputs, passwordConfirm: value})
            }
            onSubmitEditing={handlePressSubmit}
          />
        </View>
        <Button
          size="l"
          isLoading={isLoading}
          style={styles.submitButton}
          onPress={handlePressSubmit}>
          변경
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ProfileChangePasswordForm;

const styles = StyleSheet.create({
  base: {flex: 1},
  form: {flex: 1, justifyContent: 'space-between', paddingHorizontal: 16},
  inputWrapper: {gap: 12},
  submitButton: {
    marginTop: 30,
    marginBottom: 16,
    backgroundColor: Colors.primary,
  },
});
