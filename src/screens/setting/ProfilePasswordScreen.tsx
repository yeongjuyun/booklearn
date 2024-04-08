import {TouchableOpacity, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {SettingStackParamList} from 'types/navigation';
import Icon from 'components/atoms/Icon';
import ProfileChangePasswordForm from 'components/orginisms/form/ProfileChangePasswordForm';
import DefaultLayout from 'layouts/DefaultLayout';

type ProfilePasswordScreenProps = {
  navigation: StackNavigationProp<SettingStackParamList>;
};

const ProfilePasswordScreen = ({navigation}: ProfilePasswordScreenProps) => {
  return (
    <DefaultLayout
      headerTitle="비밀번호 변경"
      headerLeftContent={
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow_back" size={20} />
        </TouchableOpacity>
      }>
      <ProfileChangePasswordForm navigation={navigation} />
    </DefaultLayout>
  );
};

export default ProfilePasswordScreen;
