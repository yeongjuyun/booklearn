import {useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  useColorScheme,
  Pressable,
  Modal,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import RenderHtml from 'react-native-render-html';
import Api from 'libs/axios/api';
import {ResponseType} from 'types/common';
import {RootStackParamList, AuthStackParamList} from 'types/navigation';
import BookImage from 'assets/image/books.png';
import {Colors, HIT_SLOP} from 'constants/theme';
import Icon from 'components/atoms/Icon';
import Text from 'components/atoms/Text';
import Button from 'components/atoms/Button';
import DefaultLayout from 'layouts/DefaultLayout';

type SocialLoginScreenProps = {
  navigation: StackNavigationProp<RootStackParamList & AuthStackParamList>;
};

function SocialLoginScreen({navigation}: SocialLoginScreenProps) {
  const {width} = useWindowDimensions();
  const isDarkMode = useColorScheme() === 'dark';
  const appleButtonBorderColor = isDarkMode ? '#E0E0E9' : Colors.black;
  const appleButtonBackgroundColor = isDarkMode ? Colors.white : '#050708';
  const appleButtonTextColor = isDarkMode ? Colors.black : Colors.white;
  const textColor = isDarkMode ? Colors.dark.text : Colors.light.text;
  const modalBackgroundColor = isDarkMode
    ? Colors.dark.background
    : Colors.light.background;

  const [policyData, setPolicyData] = useState<string>();
  const [policyVisible, setPolicyVisible] = useState<boolean>(false);

  const signinWithKakao = () => {
    Api.auth.signinWithKakao(undefined, undefined, navigation);
  };

  const signinWidthGoogle = () => {
    Api.auth.signinWidthGoogle(undefined, undefined, navigation);
  };

  const fetchTermsOfService = () => {
    Api.default.getTermsOfService({}, response => {
      if (response.type === ResponseType.SUCCESS) {
        setPolicyData(response.data);
      }
    });
  };

  const fetchPrivacyPolicy = () => {
    Api.default.getPrivacyPolicy({}, response => {
      if (response.type === ResponseType.SUCCESS) {
        setPolicyData(response.data);
      }
    });
  };

  const handlePressTermsOfService = () => {
    setPolicyVisible(true);
    fetchTermsOfService();
  };

  const handlePressPrivacyPolicy = () => {
    setPolicyVisible(true);
    fetchPrivacyPolicy();
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
          <Image source={BookImage} style={styles.logoImage} />
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
          {/* TODO: 이용약관 개인정보 처리방침 링크 추가 */}
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={policyVisible}
        onRequestClose={() => setPolicyVisible(!policyVisible)}>
        <DefaultLayout
          headerLeftContent={
            <Pressable
              hitSlop={HIT_SLOP}
              onPress={() => setPolicyVisible(false)}>
              <Icon name="arrow_back" />
            </Pressable>
          }>
          <ScrollView
            style={[
              styles.modalWrapper,
              {backgroundColor: modalBackgroundColor},
            ]}>
            <RenderHtml
              contentWidth={width}
              source={{html: policyData || ''}}
              baseStyle={{color: textColor}}
            />
            <View style={styles.modalBottomSpacing} />
          </ScrollView>
        </DefaultLayout>
      </Modal>
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

  modalWrapper: {
    paddingHorizontal: 16,
    backgroundColor: 'red',
  },
  modalBottomSpacing: {marginTop: 30},
});
