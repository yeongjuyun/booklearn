import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList, SettingStackParamList} from 'types/navigation';
import Text from 'components/atoms/Text';
import DefaultLayout from 'layouts/DefaultLayout';
import {
  Alert,
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import Icon from 'components/atoms/Icon';
import ListItem from 'components/molecules/ListItem';
import {Colors} from 'constants/theme';
import Divider from 'components/atoms/Divider';
import {removeTokensFromStorage} from 'libs/async-storage';

type SettingScreenProps = {
  navigation: StackNavigationProp<RootStackParamList & SettingStackParamList>;
};

const SettingScreen = ({navigation}: SettingScreenProps) => {
  const isDarkMode = useColorScheme() === 'dark';

  const borderColor = isDarkMode ? Colors.dark.border : Colors.light.border;
  const listBackgroundColor = isDarkMode
    ? Colors.dark.surface
    : Colors.light.surface;

  const handlePressLogout = () => {
    // TODO: API 연동 후에 Logout Navigation 로직 수정
    removeTokensFromStorage();
    // 성공일 경우
    navigation.navigate('Auth');
  };

  const handlePressNotDevelop = () => {
    Alert.alert('업데이트 예정', '현재 준비중인 기능입니다');
  };

  const handlePressInquire = async () => {
    const recipientEmail = 'booklearn.contact@gmail.com';
    const subject = encodeURIComponent('제목');
    const body = encodeURIComponent('메일 내용을 입력하세요');

    const mailtoLink = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;

    try {
      await Linking.openURL(mailtoLink);
    } catch (error) {
      console.error('메일 앱을 여는 중 오류 발생:', error);
    }
  };

  return (
    <DefaultLayout
      headerTitle="설정"
      headerLeftContent={
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow_back" size={20} />
        </TouchableOpacity>
      }>
      <View>
        <Text caption style={styles.listTitle}>
          공지사항
        </Text>
        <View
          style={[
            styles.listWrapper,
            {borderColor: borderColor, backgroundColor: listBackgroundColor},
          ]}>
          <ListItem
            title="릴리즈 노트"
            endContent={<Icon name="expand_move" />}
            onPress={() => navigation.navigate('ReleaseNote')}
          />
        </View>
      </View>
      <View>
        <Text caption style={styles.listTitle}>
          계정
        </Text>
        <View
          style={[
            styles.listWrapper,
            {borderColor: borderColor, backgroundColor: listBackgroundColor},
          ]}>
          <ListItem
            title="계정 정보"
            endContent={<Icon name="expand_move" />}
            onPress={() => navigation.navigate('Profile')}
          />
        </View>
      </View>
      <View>
        <Text caption style={styles.listTitle}>
          컨텐츠
        </Text>
        <View
          style={[
            styles.listWrapper,
            {borderColor: borderColor, backgroundColor: listBackgroundColor},
          ]}>
          <ListItem
            title="테마 설정"
            endContent={<Icon name="expand_move" />}
            onPress={handlePressNotDevelop}
          />
          <ListItem
            title="알림 설정"
            endContent={<Icon name="expand_move" />}
            onPress={handlePressNotDevelop}
          />
        </View>
      </View>
      <View>
        <Text caption style={styles.listTitle}>
          기타
        </Text>
        <Divider color={borderColor} />
        <View
          style={[
            styles.listWrapper,
            {borderColor: borderColor, backgroundColor: listBackgroundColor},
          ]}>
          <ListItem title="약관 및 정책" />
          <ListItem title="앱 버전" endContent={<Text>v1.0.0</Text>} />
          <ListItem title="문의하기" onPress={handlePressInquire} />
          <ListItem title="로그아웃" onPress={handlePressLogout} />
        </View>
      </View>
    </DefaultLayout>
  );
};

export default SettingScreen;

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
});
