import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {Colors} from 'constants/theme';

const Spinner = () => {
  return (
    <View style={styles.spinnerWrapper}>
      <ActivityIndicator size="large" color={Colors.primary} />
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
