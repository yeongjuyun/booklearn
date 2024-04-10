import {Pressable, TouchableOpacity, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {SettingStackParamList} from 'types/navigation';
import {HIT_SLOP} from 'constants/theme';
import Icon from 'components/atoms/Icon';
import ProfileChangeNicknameForm from 'components/orginisms/form/ProfileChangeNicknameForm';
import DefaultLayout from 'layouts/DefaultLayout';

type ProfileNicknameScreenProps = {
  navigation: StackNavigationProp<SettingStackParamList>;
};

const ProfileNicknameScreen = ({navigation}: ProfileNicknameScreenProps) => {
  return (
    <DefaultLayout
      headerTitle="닉네임 변경"
      headerLeftContent={
        <Pressable hitSlop={HIT_SLOP} onPress={() => navigation.goBack()}>
          <Icon name="arrow_back" size={20} />
        </Pressable>
      }>
      <ProfileChangeNicknameForm navigation={navigation} />
    </DefaultLayout>
  );
};

export default ProfileNicknameScreen;
