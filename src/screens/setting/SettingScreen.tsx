import {useEffect, useState} from 'react';
import {
  Alert,
  Linking,
  Pressable,
  StyleSheet,
  View,
  useColorScheme,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {removeTokensFromStorage} from 'libs/async-storage';
import Api from 'libs/axios/api';
import {ResponseType} from 'types/common';
import {RootStackParamList, SettingStackParamList} from 'types/navigation';
import {Colors, HIT_SLOP} from 'constants/theme';
import Text from 'components/atoms/Text';
import Icon from 'components/atoms/Icon';
import Divider from 'components/atoms/Divider';
import ListItem from 'components/molecules/ListItem';
import DefaultLayout from 'layouts/DefaultLayout';

type SettingScreenProps = {
  navigation: StackNavigationProp<RootStackParamList & SettingStackParamList>;
};

const SettingScreen = ({navigation}: SettingScreenProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  const borderColor = isDarkMode ? Colors.dark.border : Colors.light.border;
  const listBackgroundColor = isDarkMode
    ? Colors.dark.surface
    : Colors.light.surface;

  const [appVersion, setAppVersion] = useState<string>('');

  const handlePressNotDevelop = () => {
    Alert.alert('업데이트 예정', '현재 준비중인 기능입니다', [{text: '확인'}]);
  };

  const fetchAppVersion = () => {
    Api.default.getAppVersions(undefined, response => {
      if (response.type === ResponseType.SUCCESS) {
        const version = response.data[0].version;
        setAppVersion(version);
      }
    });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchAppVersion);
    return unsubscribe;
  }, [navigation]);

  const handlePressLogout = () => {
    removeTokensFromStorage(() => {
      navigation.navigate('Auth');
    });
  };

  return (
    <DefaultLayout
      headerTitle="설정"
      headerLeftContent={
        <Pressable hitSlop={HIT_SLOP} onPress={() => navigation.goBack()}>
          <Icon name="arrow_back" size={20} />
        </Pressable>
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
          <ListItem
            title="약관 및 정책"
            endContent={<Icon name="expand_move" />}
            onPress={() => navigation.navigate('Policy')}
          />
          <ListItem
            title="앱 버전"
            endContent={<Text body>{appVersion}</Text>}
          />
          <ListItem
            title="문의하기"
            onPress={() => navigation.navigate('Inquire')}
          />
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
