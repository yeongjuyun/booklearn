import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  useColorScheme,
  Pressable,
  Platform,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {appleAuthAndroid} from '@invertase/react-native-apple-authentication';
import Api from 'libs/axios/api';
import LogoBlack from 'assets/logo/logo-full-black.png';
import LogoWhite from 'assets/logo/logo-full-white.png';
import {RootStackParamList, AuthStackParamList} from 'types/navigation';
import {Colors, HIT_SLOP} from 'constants/theme';
import {openExternalLink} from 'utils/common';
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
  const LogoImage = isDarkMode ? LogoWhite : LogoBlack;

  const signinWithKakao = () => {
    Api.auth.signinWithKakao(undefined, undefined, navigation);
  };

  const signinWidthGoogle = () => {
    Api.auth.signinWidthGoogle(undefined, undefined, navigation);
  };

  const signinWithApple = () => {
    if (Platform.OS === 'ios') {
      Api.auth.signinWithAppleForIos(undefined, undefined, navigation);
    } else {
      Api.auth.signinWithAppleForAndroid(undefined, undefined, navigation);
    }
  };

  const handlePressTermsOfService = () => {
    openExternalLink(
      'https://antique-playroom-7c4.notion.site/37cf16a4b75f493192009abdd6e4fbae?pvs=4',
    );
  };

  const handlePressPrivacyPolicy = () => {
    openExternalLink(
      'https://antique-playroom-7c4.notion.site/fa3ff4fe50d943138b68584ff5bf2656?pvs=4',
    );
  };

  return (
    <DefaultLayout
      headerLeftContent={
        <Pressable
          hitSlop={HIT_SLOP}
          onPress={() => navigation.navigate('Launch')}>
          <Icon name="arrow_back" />
        </Pressable>
      }>
      <View style={styles.wrapper}>
        <View style={styles.logoWrapper}>
          <Image
            source={LogoImage}
            resizeMode={'contain'}
            style={styles.logoImage}
          />
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
            {(Platform.OS === 'ios' ||
              (Platform.OS === 'android' && appleAuthAndroid.isSupported)) && (
              <Button
                size="l"
                style={{
                  borderWidth: 1,
                  borderColor: appleButtonBorderColor,
                  backgroundColor: appleButtonBackgroundColor,
                }}
                textStyle={{color: appleButtonTextColor}}
                onPress={signinWithApple}>
                <Icon
                  name="apple_logo"
                  size={18}
                  color={appleButtonTextColor}
                />
                애플로 계속하기
              </Button>
            )}
            <Button
              size="l"
              style={{
                borderWidth: 1,
                borderColor: '#747775',
                backgroundColor: Colors.white,
              }}
              textStyle={{color: Colors.black}}
              onPress={signinWidthGoogle}>
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
          <Text caption numberOfLines={2} style={styles.caption}>
            로그인 시{' '}
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.linkButton}
              onPress={handlePressTermsOfService}>
              <Text style={styles.linkText}>이용약관</Text>
            </TouchableOpacity>
            과{' '}
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.linkButton}
              onPress={handlePressPrivacyPolicy}>
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
  logoWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: 280,
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
