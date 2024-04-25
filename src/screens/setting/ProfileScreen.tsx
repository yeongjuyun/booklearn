import {Alert, Pressable, StyleSheet, View, useColorScheme} from 'react-native';
import {useEffect, useState} from 'react';
import Api from 'libs/axios/api';
import {StackNavigationProp} from '@react-navigation/stack';
import {removeTokensFromStorage} from 'libs/async-storage';
import {ResponseType, SigninProviderType} from 'types/common';
import {RootStackParamList, SettingStackParamList} from 'types/navigation';
import {Colors, HIT_SLOP} from 'constants/theme';
import Icon from 'components/atoms/Icon';
import Text from 'components/atoms/Text';
import ListItem from 'components/molecules/ListItem';
import DefaultLayout from 'layouts/DefaultLayout';

type ProfileScreenProps = {
  navigation: StackNavigationProp<RootStackParamList & SettingStackParamList>;
};

const ProfileScreen = ({navigation}: ProfileScreenProps) => {
  const isDarkMode = useColorScheme() === 'dark';

  const borderColor = isDarkMode ? Colors.dark.border : Colors.light.border;
  const listBackgroundColor = isDarkMode
    ? Colors.dark.surface
    : Colors.light.surface;
  const dangerColor = isDarkMode ? Colors.dark.error : Colors.light.error;

  const [userData, setUserData] = useState<{
    email: string;
    name: string;
    provider: SigninProviderType;
  }>();

  const getUserData = () => {
    Api.user.getUser(undefined, response => {
      if (response.type === ResponseType.SUCCESS) {
        setUserData(response.data);
      } else {
        Alert.alert('', response.message, [{text: '확인'}]);
      }
    });
  };

  const withdrawMember = () => {
    Api.user.deleteUser(undefined, response => {
      if (response.type === ResponseType.SUCCESS) {
        removeTokensFromStorage(() => {
          navigation.navigate('Auth');
          Alert.alert('회원탈퇴', response.message, [{text: '확인'}]);
        });
      }
    });
  };

  const handlePressWithdraw = () => {
    Alert.alert('회원탈퇴', '정말 탈퇴하시겠습니까?', [
      {text: '취소', style: 'cancel'},
      {text: '탈퇴', style: 'destructive', onPress: withdrawMember},
    ]);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', getUserData);
    return unsubscribe;
  }, [navigation]);

  return (
    <DefaultLayout
      headerTitle="계정 정보"
      headerLeftContent={
        <Pressable hitSlop={HIT_SLOP} onPress={() => navigation.goBack()}>
          <Icon name="arrow_back" size={20} />
        </Pressable>
      }>
      {userData && (
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
              title={userData.email}
              startContent={
                <Text body style={styles.listItem}>
                  로그인 ID
                </Text>
              }
            />
            <ListItem
              title={userData.provider}
              startContent={
                <Text body style={styles.listItem}>
                  연결된 계정
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
              title={userData.name}
              startContent={
                <Text body style={styles.listItem}>
                  닉네임 변경
                </Text>
              }
              endContent={<Icon name="expand_move" />}
              onPress={() => navigation.navigate('ProfileNickname')}
            />
            <ListItem
              title="비밀번호 변경"
              visible={userData.provider === SigninProviderType.LOCAL}
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
              onPress={handlePressWithdraw}
            />
          </View>
        </View>
      )}
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
