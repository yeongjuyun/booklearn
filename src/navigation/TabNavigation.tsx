import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {theme} from 'constants/theme';
import Icon from 'components/atoms/Icon';
import {BookStack} from './stack/BookStack';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from 'types/navigation';
import {useEffect} from 'react';
import {getTokensFromStorage} from 'libs/async-storage';
import RootNavigation from './RootNavigation';

const Tab = createBottomTabNavigator();

function TabNavigation() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // useEffect(() => {
  //   const loginCheck = async () => {
  //     const { refreshToken } = await getTokensFromStorage();
  //     setTimeout(() => {
  //       SplashScreen.hide();
  //     }, 300);
  //     // refreshToken 만료기한 & accessToken 재발급 로직
  //     if (refreshToken) {
  //       await axios
  //         .get(`${BASE_URL}/auth`, {
  //           timeout: 3000,
  //           headers: { Authorization: `Bearer ${refreshToken}` },
  //         })
  //         .then(async res => {
  //           const newAccessToken = res.data.resultBody.accessToken;
  //           saveAccessTokenToStorage(newAccessToken);
  //           return true;
  //         })
  //         .catch(async err => {
  //           console.log('토큰 재발급 중 에러 발생', err.response);
  //           await removeTokensFromStorage();
  //           navigation.navigate(RootNavigation.LOGIN);
  //         });
  //     } else {
  //       navigation.navigate(RootNavigation.LOGIN);
  //     }
  //   };
  //   loginCheck();
  // }, [navigation]);

  useEffect(() => {
    const accessTokenCheck = async () => {
      const {accessToken} = await getTokensFromStorage();
      if (!accessToken) {
        navigation.navigate('Auth');
        // ToastAndroid.show('로그인이 필요한 서비스입니다.', ToastAndroid.SHORT);
      }
    };
    accessTokenCheck();
  }, [navigation]);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          // display: 'none',
          height: 80,
          paddingTop: 8,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: theme.colors.primary100,
      }}>
      <Tab.Screen
        name="HomeStack"
        component={BookStack}
        options={({route}) => ({
          tabBarLabel: '홈',
          tabBarIcon: ({color, size}) => (
            <Icon name="home_fill" size={size} color={color} />
          ),
        })}
      />
    </Tab.Navigator>
  );
}

export default TabNavigation;
