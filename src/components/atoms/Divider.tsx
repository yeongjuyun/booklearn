import React from 'react';
import {View, StyleSheet, ViewProps, StyleProp, ViewStyle} from 'react-native';
import {theme} from 'constants/theme';

export interface DividerProps extends ViewProps {
  orientation?: 'horizontal' | 'vertical';
  color?: string;
  width?: number;
  inset?: boolean;
  style?: StyleProp<ViewStyle>;
}

const Divider = ({
  color,
  inset = false,
  orientation = 'horizontal',
  style,
  width,
  ...rest
}: DividerProps) => (
  <View
    style={[
      styles.divider,
      style,
      inset && styles.inset,
      orientation === 'vertical' && styles.vertical,
      width
        ? orientation === 'horizontal'
          ? {borderBottomWidth: width}
          : {borderRightWidth: width}
        : null,
      color
        ? orientation === 'horizontal'
          ? {borderBottomColor: color}
          : {borderRightColor: color}
        : null,
    ]}
    {...rest}
  />
);

export default Divider;

const styles = StyleSheet.create({
  divider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.white,
  },
  inset: {
    marginLeft: 72,
    marginRight: 72,
  },
  vertical: {
    borderBottomWidth: 0,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: theme.colors.white,
    height: 'auto',
    alignSelf: 'stretch',
  },
});
