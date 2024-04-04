import {Colors} from 'constants/theme';
import {
  Text as NativeText,
  StyleSheet,
  TextProps as TextProperties,
  TextStyle,
  StyleProp,
  GestureResponderEvent,
  useColorScheme,
  TouchableOpacity,
} from 'react-native';
import normalize from 'utls/nomalizeText';

interface TextProps extends TextProperties {
  style?: StyleProp<TextStyle>;
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  h5?: boolean;
  h6?: boolean;
  body?: boolean;
  sub?: boolean;
  button?: boolean;
  caption?: boolean;
  numberOfLines?: number;
  onPress?: (event: GestureResponderEvent) => void;
}

const Text = ({
  children = '',
  style = {},
  h1 = false,
  h2 = false,
  h3 = false,
  h4 = false,
  h5 = false,
  h6 = false,
  body = false,
  sub = false,
  button = false,
  caption = false,
  numberOfLines = 1,
}: TextProps) => {
  const isDarkMode = useColorScheme() === 'dark';

  const textColor = {
    color: isDarkMode ? Colors.dark.text : Colors.light.text,
  };

  const captionTextColor = {
    color: isDarkMode ? Colors.dark.neutral : Colors.light.neutral,
  };

  return (
    <NativeText
      numberOfLines={numberOfLines}
      ellipsizeMode="tail"
      accessibilityRole="text"
      style={StyleSheet.flatten([
        textColor,
        styles.base,
        h1 && StyleSheet.flatten([{fontSize: normalize(30)}, styles.h1]),
        h2 && StyleSheet.flatten([{fontSize: normalize(28)}, styles.h2]),
        h3 && StyleSheet.flatten([{fontSize: normalize(24)}, styles.h3]),
        h4 && StyleSheet.flatten([{fontSize: normalize(22)}, styles.h4]),
        h5 && StyleSheet.flatten([{fontSize: normalize(16)}, styles.h5]),
        h6 && StyleSheet.flatten([{fontSize: normalize(14)}, styles.h6]),
        body && StyleSheet.flatten([{fontSize: normalize(16)}, styles.body]),
        sub && StyleSheet.flatten([{fontSize: normalize(14)}, styles.body]),
        button &&
          StyleSheet.flatten([{fontSize: normalize(16)}, styles.button]),
        caption &&
          StyleSheet.flatten([
            {fontSize: normalize(13)},
            styles.caption,
            captionTextColor,
          ]),
        style,
      ])}>
      {children}
    </NativeText>
  );
};

export default Text;

const styles = StyleSheet.create({
  base: {
    fontWeight: 'normal',
  },
  h1: {
    fontWeight: 'bold',
  },
  h2: {
    fontWeight: 'bold',
  },
  h3: {
    fontWeight: 'bold',
  },
  h4: {
    fontWeight: 'bold',
  },
  h5: {
    fontWeight: 'bold',
  },
  h6: {
    fontWeight: 'bold',
  },
  body: {
    fontWeight: 'normal',
  },
  sub: {
    fontWeight: 'normal',
  },
  button: {
    fontWeight: '500',
    color: '#ffffff,',
  },
  caption: {
    fontWeight: '400',
  },
});
