import {Pressable} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {SettingStackParamList} from 'types/navigation';
import {HIT_SLOP} from 'constants/theme';
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
        <Pressable hitSlop={HIT_SLOP} onPress={() => navigation.goBack()}>
          <Icon name="arrow_back" size={20} />
        </Pressable>
      }>
      <ProfileChangePasswordForm navigation={navigation} />
    </DefaultLayout>
  );
};

export default ProfilePasswordScreen;
