import {ReactNode} from 'react';
import {StyleSheet, View, useColorScheme} from 'react-native';
import {Colors} from 'constants/theme';
import Text from './Text';

type ChipProps = {
  children: ReactNode;
  startContent?: ReactNode;
  endContent?: ReactNode;
};

const Chip = ({children, startContent, endContent}: ChipProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  const chipBackgroundColor = isDarkMode
    ? Colors.dark.surface
    : Colors.light.surface;
  const chipBorderColor = isDarkMode ? Colors.dark.border : Colors.light.border;
  const chipTextColor = isDarkMode ? Colors.dark.text : Colors.light.text;

  return (
    <View
      style={[
        styles.baseWrapper,
        {
          borderColor: chipBorderColor,
          backgroundColor: chipBackgroundColor,
        },
      ]}>
      {startContent && <View>{startContent}</View>}
      <Text caption style={{color: chipTextColor}}>
        {children}
      </Text>
      {endContent && <View>{endContent}</View>}
    </View>
  );
};

export default Chip;

const styles = StyleSheet.create({
  baseWrapper: {
    borderWidth: 1,
    alignSelf: 'flex-start',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
});
