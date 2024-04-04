import {TouchableOpacity} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList, RootStackParamList} from 'types/navigation';
import Icon from 'components/atoms/Icon';
import SigninForm from 'components/orginisms/form/SigninForm';
import DefaultLayout from 'layouts/DefaultLayout';

type SigninScreenProps = {
  navigation: StackNavigationProp<RootStackParamList & AuthStackParamList>;
};

const SigninScreen = ({navigation}: SigninScreenProps) => {
  return (
    <DefaultLayout
      isSafeAreaView
      headerTitle="로그인"
      headerLeftContent={
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow_back" />
        </TouchableOpacity>
      }>
      <SigninForm navigation={navigation} />
    </DefaultLayout>
  );
};

export default SigninScreen;
