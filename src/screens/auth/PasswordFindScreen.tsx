import {StackNavigationProp} from '@react-navigation/stack';
import {TouchableOpacity} from 'react-native';
import {AuthStackParamList} from 'types/navigation';
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
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow_back" />
        </TouchableOpacity>
      }>
      <PasswordFindForm navigation={navigation} />
    </DefaultLayout>
  );
};

export default PasswordFindScreen;
