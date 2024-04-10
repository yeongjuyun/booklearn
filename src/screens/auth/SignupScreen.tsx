import {Pressable} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from 'types/navigation';
import {HIT_SLOP} from 'constants/theme';
import Icon from 'components/atoms/Icon';
import SignupForm from 'components/orginisms/form/SignupForm';
import DefaultLayout from 'layouts/DefaultLayout';

type SignupScreenProps = {
  navigation: StackNavigationProp<AuthStackParamList>;
};

const SignupScreen = ({navigation}: SignupScreenProps) => {
  return (
    <DefaultLayout
      isSafeAreaView
      headerTitle="회원가입"
      headerLeftContent={
        <Pressable hitSlop={HIT_SLOP} onPress={() => navigation.goBack()}>
          <Icon name="arrow_back" />
        </Pressable>
      }>
      <SignupForm navigation={navigation} />
    </DefaultLayout>
  );
};

export default SignupScreen;
