import {StackNavigationProp} from '@react-navigation/stack';
import {Image, StyleSheet, View} from 'react-native';
import {AuthStackParamList} from 'types/navigation';
import YogaImage from 'assets/image/yoga.png';
import {Colors} from 'constants/theme';
import Button from 'components/atoms/Button';
import Text from 'components/atoms/Text';

type LaunchScreenProps = {
  navigation: StackNavigationProp<AuthStackParamList>;
};

const LaunchScreen = ({navigation}: LaunchScreenProps) => {
  return (
    <View style={styles.base}>
      <View style={styles.topSection}>
        <Text h3 style={styles.logo}>
          Booklearn
        </Text>
        <View style={styles.description}>
          <Text h1 style={{color: Colors.black}}>
            책의 배움을 기록으로
          </Text>
          <Text h1 style={{color: Colors.black}}>
            일상을 채우는 독서
          </Text>
        </View>
      </View>
      <Image source={YogaImage} style={styles.image} />
      <Button
        activeOpacity={1}
        textStyle={styles.buttonText}
        style={styles.button}
        onPress={() => navigation.navigate('Main')}>
        시작하기
      </Button>
    </View>
  );
};

export default LaunchScreen;

const styles = StyleSheet.create({
  base: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 50,
    paddingHorizontal: 25,
    backgroundColor: '#DAE2EB',
  },
  topSection: {
    marginTop: 32,
    alignItems: 'center',
    zIndex: 10,
  },
  logo: {
    // TODO: Background linear gradient 적용할지 고민
    color: '#AFBCCB',
  },
  description: {
    alignItems: 'center',
    marginTop: 18,
  },
  descriptionText: {},
  image: {
    position: 'absolute',
    right: -85,
    bottom: 0,
  },
  buttonText: {
    color: '#000000',
    fontWeight: '600',
  },
  button: {
    height: 48,
    borderRadius: 100,
    backgroundColor: '#ffffff',
  },
});
