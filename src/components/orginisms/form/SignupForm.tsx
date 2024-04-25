import React, {useRef} from 'react';
import useSWR from 'swr';
import {KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from 'types/navigation';
import {SWR_KEY} from 'constants/swrKey';
import SignupInputForm from './SignupInputForm';
import SignupEmailVerificationForm from './SignupEmailVerificationForm';

type SignupFormProps = {
  navigation: StackNavigationProp<AuthStackParamList>;
};

const SignupForm = ({navigation}: SignupFormProps) => {
  const {data: auth_verify_done_data} = useSWR(SWR_KEY.auth.signup.verify.done);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.base}>
      {auth_verify_done_data ? (
        <SignupInputForm navigation={navigation} />
      ) : (
        <SignupEmailVerificationForm isSignup={true} />
      )}
    </KeyboardAvoidingView>
  );
};

export default SignupForm;

const styles = StyleSheet.create({
  base: {flex: 1},
});
