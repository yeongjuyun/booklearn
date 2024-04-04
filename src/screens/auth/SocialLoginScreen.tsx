import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  useColorScheme,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import Api from 'libs/axios/api';
import {RootStackParamList, AuthStackParamList} from 'types/navigation';
import SigninImage from 'assets/image/signin.png';
import {Colors} from 'constants/theme';
import Icon from 'components/atoms/Icon';
import Text from 'components/atoms/Text';
import Button from 'components/atoms/Button';
import DefaultLayout from 'layouts/DefaultLayout';

type SocialLoginScreenProps = {
  navigation: StackNavigationProp<RootStackParamList & AuthStackParamList>;
};

function SocialLoginScreen({navigation}: SocialLoginScreenProps) {
  const isDarkMode = useColorScheme() === 'dark';
  const appleButtonBorderColor = isDarkMode ? '#E0E0E9' : Colors.black;
  const appleButtonBackgroundColor = isDarkMode ? Colors.white : '#050708';
  const appleButtonTextColor = isDarkMode ? Colors.black : Colors.white;

  const signinWithKakao = () => {
    console.log(1111);
    Api.auth.signinWithKakao(undefined, undefined, navigation);
  };

  return (
    <DefaultLayout
      headerLeftContent={
        <TouchableOpacity onPress={() => navigation.navigate('Launch')}>
          <Icon name="arrow_back" />
        </TouchableOpacity>
      }>
      <View style={styles.wrapper}>
        <View style={styles.logoWrapper}>
          <Image source={SigninImage} style={styles.logoImage} />
          <View style={styles.logo}>
            <Text h1>Book</Text>
            <Text h1 style={{color: Colors.primary}}>
              learn
            </Text>
          </View>
        </View>
        <View style={styles.innerWrapper}>
          <View style={{gap: 10}}>
            <Button
              size="l"
              style={{backgroundColor: '#FEE500'}}
              textStyle={{color: Colors.black}}
              onPress={signinWithKakao}>
              <Icon name="kakao_logo" size={18} />
              카카오로 계속하기
            </Button>
            <Button
              size="l"
              style={{
                borderWidth: 1,
                borderColor: appleButtonBorderColor,
                backgroundColor: appleButtonBackgroundColor,
              }}
              textStyle={{color: appleButtonTextColor}}
              onPress={() => navigation.navigate('Home')}>
              <Icon name="apple_logo" size={18} color={appleButtonTextColor} />
              애플로 계속하기
            </Button>
            <Button
              size="l"
              style={{
                borderWidth: 1,
                borderColor: '#747775',
                backgroundColor: Colors.white,
              }}
              textStyle={{color: Colors.black}}
              onPress={() => navigation.navigate('Home')}>
              <Icon name="google_logo" size={18} />
              구글로 계속하기
            </Button>
            <Button
              size="l"
              style={[{backgroundColor: Colors.primary}]}
              onPress={() => navigation.navigate('Signin')}>
              이메일로 계속하기
            </Button>
          </View>
          {/* TODO: 이용약관 개인정보 처리방침 링크 추가 */}
          <Text caption numberOfLines={2} style={styles.caption}>
            로그인 시{' '}
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.linkButton}
              onPress={() => console.log('이용약관')}>
              <Text style={styles.linkText}>이용약관</Text>
            </TouchableOpacity>
            과{' '}
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.linkButton}
              onPress={() => console.log('개인정보')}>
              <Text style={styles.linkText}>개인정보처리방침</Text>
            </TouchableOpacity>
            에{'\n'}동의하는 것으로 간주됩니다.
          </Text>
        </View>
      </View>
    </DefaultLayout>
  );
}

export default SocialLoginScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  logoWrapper: {},
  logoImage: {
    width: 280,
    height: 280,
    alignSelf: 'center',
  },
  logo: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  innerWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    paddingBottom: 60,
    gap: 30,
  },

  linkButton: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  linkText: {
    fontSize: 12,
    textDecorationLine: 'underline',
    color: Colors.primary,
  },
  caption: {
    textAlign: 'center',
  },
});
