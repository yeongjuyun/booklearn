import {useState} from 'react';
import {Alert, KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import useSWR from 'swr';
import Api from 'libs/axios/api';
import {ResponseType} from 'types/common';
import {AuthStackParamList} from 'types/navigation';
import {SWR_KEY} from 'constants/swrKey';
import Spinner from 'components/atoms/Spinner';
import PasswordFindEmailVerificationForm from './PasswordFindEmailVerificationForm';

type PasswordFindFormProps = {
  navigation: StackNavigationProp<AuthStackParamList>;
};

const PasswordFindForm = ({navigation}: PasswordFindFormProps) => {
  const {data: auth_verify_email_data, mutate: auth_verify_email_mutate} =
    useSWR(SWR_KEY.auth.passwordFind.verify.email);
  const {mutate: auth_verify_done_mutate} = useSWR(
    SWR_KEY.auth.passwordFind.verify.done,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const resetPassword = () => {
    setIsLoading(true);

    const payload = {email: auth_verify_email_data};
    Api.auth.resetPassword(payload, response => {
      if (response.type === ResponseType.SUCCESS) {
        navigation.navigate('Signin');
        auth_verify_email_mutate(undefined);
        auth_verify_done_mutate(undefined);
        Alert.alert('비밀번호 초기화', response.message, [{text: '확인'}]);
      } else {
        Alert.alert('비밀번호 초기화 실패', response.message, [{text: '확인'}]);
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
      <PasswordFindEmailVerificationForm
        isSignup={false}
        onSuccessVerification={resetPassword}
      />
    </KeyboardAvoidingView>
  );
};

export default PasswordFindForm;

const styles = StyleSheet.create({
  base: {flex: 1},
});
