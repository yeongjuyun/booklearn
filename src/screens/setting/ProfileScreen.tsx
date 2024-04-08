import {StyleSheet, TouchableOpacity, View, useColorScheme} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {SettingStackParamList} from 'types/navigation';
import {Colors} from 'constants/theme';
import Icon from 'components/atoms/Icon';
import Text from 'components/atoms/Text';
import ListItem from 'components/molecules/ListItem';
import DefaultLayout from 'layouts/DefaultLayout';

type ProfileScreenProps = {
  navigation: StackNavigationProp<SettingStackParamList>;
};

const ProfileScreen = ({navigation}: ProfileScreenProps) => {
  const isDarkMode = useColorScheme() === 'dark';

  const borderColor = isDarkMode ? Colors.dark.border : Colors.light.border;
  const listBackgroundColor = isDarkMode
    ? Colors.dark.surface
    : Colors.light.surface;
  const dangerColor = isDarkMode ? Colors.dark.error : Colors.light.error;

  // TODO: 회원정보 email, 로그인수단 확인해서 비밀번호 변경 메뉴 표시

  const handlePressWithdraw = async () => {
    //TODO: 회원탈퇴 API 연동
  };

  return (
    <DefaultLayout
      headerTitle="계정 정보"
      headerLeftContent={
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow_back" size={20} />
        </TouchableOpacity>
      }>
      <View>
        <Text caption style={styles.listTitle}>
          프로필
        </Text>
        <View
          style={[
            styles.listWrapper,
            {borderColor: borderColor, backgroundColor: listBackgroundColor},
          ]}>
          <ListItem
            title="myyun1029@gmail.com"
            startContent={
              <Text body style={styles.listItem}>
                로그인 ID
              </Text>
            }
          />
        </View>
        <Text caption style={styles.listTitle}>
          회원 정보 수정
        </Text>
        <View
          style={[
            styles.listWrapper,
            {borderColor: borderColor, backgroundColor: listBackgroundColor},
          ]}>
          <ListItem
            title="닉네임 변경"
            endContent={<Icon name="expand_move" />}
            onPress={() => navigation.navigate('ProfileNickname')}
          />
          <ListItem
            title="비밀번호 변경"
            endContent={<Icon name="expand_move" />}
            onPress={() => navigation.navigate('ProfilePassword')}
          />
        </View>
        <Text caption style={styles.listTitle} />
        <View
          style={[
            styles.listWrapper,
            {borderColor: borderColor, backgroundColor: listBackgroundColor},
          ]}>
          <ListItem
            startContent={
              <Text body style={{color: dangerColor}}>
                회원 탈퇴
              </Text>
            }
            endContent={<Icon name="expand_move" />}
            onPress={handlePressWithdraw}
          />
        </View>
      </View>
    </DefaultLayout>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  listTitle: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginTop: 10,
  },
  listWrapper: {
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
  },
  listItem: {
    width: 130,
  },
});
