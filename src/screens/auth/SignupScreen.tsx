import {TouchableOpacity} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from 'types/navigation';
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
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow_back" />
        </TouchableOpacity>
      }>
      <SignupForm navigation={navigation} />
    </DefaultLayout>
  );
};

export default SignupScreen;
