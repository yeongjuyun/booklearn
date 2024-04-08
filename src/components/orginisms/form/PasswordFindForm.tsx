import {Alert, KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import useSWR from 'swr';
import Api from 'libs/axios/api';
import {ResponseType} from 'types/common';
import {AuthStackParamList} from 'types/navigation';
import {SWR_KEY} from 'constants/swrKey';
import EmailVerificationForm from './EmailVerificationForm';
import {useState} from 'react';
import Spinner from 'components/atoms/Spinner';

type PasswordFindFormProps = {
  navigation: StackNavigationProp<AuthStackParamList>;
};

const PasswordFindForm = ({navigation}: PasswordFindFormProps) => {
  const {data: auth_verify_email_data} = useSWR(SWR_KEY.auth.verify.email);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const resetPassword = async () => {
    setIsLoading(true);

    const payload = {email: auth_verify_email_data};
    await Api.auth.resetPassword(payload, response => {
      if (response.type === ResponseType.SUCCESS) {
        navigation.navigate('Signin');
        Alert.alert(
          '비밀번호 초기화',
          '임시 비밀번호가 발송되었습니다 \n 로그인 후 비밀번호를 변경해주시기 바랍니다',
        );
      } else {
        Alert.alert('비밀번호 초기화 실패', response.message);
      }

      setIsLoading(false);
    });
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.base}>
      <EmailVerificationForm
        isSignup={false}
        onSuccessEmailVerification={resetPassword}
      />
    </KeyboardAvoidingView>
  );
};

export default PasswordFindForm;

const styles = StyleSheet.create({
  base: {flex: 1},
});
