import {Pressable} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList, RootStackParamList} from 'types/navigation';
import {HIT_SLOP} from 'constants/theme';
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
        <Pressable hitSlop={HIT_SLOP} onPress={() => navigation.goBack()}>
          <Icon name="arrow_back" />
        </Pressable>
      }>
      <SigninForm navigation={navigation} />
    </DefaultLayout>
  );
};

export default SigninScreen;
