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
import useInputs from 'hooks/useInputs';
import Button from 'components/atoms/Button';
import Input from 'components/atoms/Input';

type ProfileChangePasswordFormProps = {
  navigation: StackNavigationProp<SettingStackParamList>;
};

const ProfileChangePasswordForm = ({
  navigation,
}: ProfileChangePasswordFormProps) => {
  const {values, errors, isValidLength, handleChange, clearInputs, setError} =
    useInputs({
      password: '',
      passwordConfirm: '',
    });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const passwordInputRef = useRef<TextInput>(null);
  const passwordConfirmInputRef = useRef<TextInput>(null);

  const handlePressSubmit = () => {
    const {password, passwordConfirm} = values;

    if (password.length < 8) {
      passwordInputRef.current?.focus();
      return setError('password', '비밀번호를 8자 이상 입력해주세요');
    }

    if (password !== passwordConfirm) {
      passwordConfirmInputRef.current?.focus();
      return setError('passwordConfirm', '비밀번호가 일치하지 않습니다');
    }

    setIsLoading(true);

    const payload = {password: values.password};
    Api.user.updatePassword(payload, response => {
      if (response.type === ResponseType.SUCCESS) {
        clearInputs();
        Alert.alert('비밀번호 변경', response.message, [{text: '확인'}]);
        navigation.navigate('Profile');
      } else {
        Alert.alert('요청 실패', response.message, [{text: '확인'}]);
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
            value={values.password}
            maxLength={30}
            placeholder="새 비밀번호"
            autoFocus={true}
            errorText={errors.password}
            onChangeText={text => handleChange('password', text)}
            onSubmitEditing={() => passwordConfirmInputRef.current?.focus()}
          />
          <Input
            ref={passwordConfirmInputRef}
            type={'password'}
            value={values.passwordConfirm}
            maxLength={30}
            placeholder="새 비밀번호 확인"
            errorText={errors.passwordConfirm}
            onChangeText={text => handleChange('passwordConfirm', text)}
            onSubmitEditing={handlePressSubmit}
          />
        </View>
        <Button
          size="l"
          isLoading={isLoading}
          disabled={!(isValidLength.password && isValidLength.passwordConfirm)}
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
