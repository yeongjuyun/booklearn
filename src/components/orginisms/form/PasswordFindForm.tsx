import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from 'types/navigation';
import EmailVerificationForm from './EmailVerificationForm';

type PasswordFindFormProps = {
  navigation: StackNavigationProp<AuthStackParamList>;
};

const PasswordFindForm = ({navigation}: PasswordFindFormProps) => {
  const handleSubmit = () => {
    Alert.alert(
      '비밀번호 초기화',
      '임시 비밀번호가 발송되었습니다 \n 로그인 후 비밀번호를 변경해주시기 바랍니다',
      [{text: '확인', onPress: () => navigation.navigate('Signin')}],
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.base}>
      <EmailVerificationForm onSuccess={handleSubmit} />
    </KeyboardAvoidingView>
  );
};

export default PasswordFindForm;

const styles = StyleSheet.create({
  base: {flex: 1},
});
