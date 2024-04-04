import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList, SettingStackParamList} from 'types/navigation';
import Text from 'components/atoms/Text';
import DefaultLayout from 'layouts/DefaultLayout';
import {StyleSheet, TouchableOpacity, View, useColorScheme} from 'react-native';
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
          />
          <ListItem
            title="알림 설정"
            endContent={<Icon name="expand_move" />}
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
          <ListItem title="오픈소스 라이센스" />
          <ListItem title="앱 버전" />
          <ListItem title="문의하기" />
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
    // flex: 1,
    // fontSize: 16,
    // textAlignVertical: 'top',
    // padding: 16,
    // backgroundColor: 'red',
  },
});
