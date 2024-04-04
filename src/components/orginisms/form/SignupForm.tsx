import React, {useState} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from 'types/navigation';
import EmailVerificationForm from './EmailVerificationForm';
import SignupInputForm from './SignupInputForm';

type SignupFormProps = {
  navigation: StackNavigationProp<AuthStackParamList>;
};

const SignupForm = ({navigation}: SignupFormProps) => {
  const [email, setEmail] = useState<string>('');

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.base}>
      {!email ? (
        <EmailVerificationForm onSuccess={(value: string) => setEmail(value)} />
      ) : (
        <SignupInputForm email={email} navigation={navigation} />
      )}
    </KeyboardAvoidingView>
  );
};

export default SignupForm;

const styles = StyleSheet.create({
  base: {flex: 1},
});
