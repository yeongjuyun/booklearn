import {Pressable} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from 'types/navigation';
import {HIT_SLOP} from 'constants/theme';
import Icon from 'components/atoms/Icon';
import PasswordFindForm from 'components/orginisms/form/PasswordFindForm';
import DefaultLayout from 'layouts/DefaultLayout';

type PasswordFindScreenProps = {
  navigation: StackNavigationProp<AuthStackParamList>;
};

const PasswordFindScreen = ({navigation}: PasswordFindScreenProps) => {
  return (
    <DefaultLayout
      isSafeAreaView
      headerTitle="비밀번호 찾기"
      headerLeftContent={
        <Pressable hitSlop={HIT_SLOP} onPress={() => navigation.goBack()}>
          <Icon name="arrow_back" />
        </Pressable>
      }>
      <PasswordFindForm navigation={navigation} />
    </DefaultLayout>
  );
};

export default PasswordFindScreen;
