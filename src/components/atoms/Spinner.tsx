import {
  ActivityIndicator,
  StyleSheet,
  View,
  useColorScheme,
} from 'react-native';
import {Colors} from 'constants/theme';

type SpinnerProps = {
  size?: 'small' | 'large';
  color?: string;
};

const Spinner = ({size = 'large', color}: SpinnerProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  const spinnerColor = color
    ? color
    : isDarkMode
    ? Colors.white
    : Colors.primary;

  return (
    <View style={styles.spinnerWrapper}>
      <ActivityIndicator size={size} color={spinnerColor} />
    </View>
  );
};

export default Spinner;

const styles = StyleSheet.create({
  spinnerWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
