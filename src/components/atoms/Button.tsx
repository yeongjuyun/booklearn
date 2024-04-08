import React, {Fragment, ReactNode} from 'react';
import {
  View,
  StyleSheet,
  GestureResponderEvent,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
  TextStyle,
} from 'react-native';
import {Colors} from 'constants/theme';
import Text from './Text';
import Spinner from './Spinner';

type ButtonProps = {
  children?: ReactNode;
  size?: 's' | 'm' | 'l';
  activeOpacity?: number;
  disabled?: boolean;
  isLoading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress?: (event: GestureResponderEvent) => void;
};

function Button({
  children,
  size = 'm',
  activeOpacity,
  disabled,
  isLoading,
  style,
  textStyle,
  onPress,
  ...rest
}: ButtonProps) {
  const getButtonSize = (size: 's' | 'm' | 'l') => {
    switch (size) {
      case 's':
        return {paddingVertical: 8};
      case 'm':
        return {paddingVertical: 12};
      case 'l':
        return {paddingVertical: 16};
    }
  };

  let buttonSize = getButtonSize(size);

  return (
    <View style={(disabled || isLoading) && styles.disabled}>
      <TouchableOpacity
        activeOpacity={activeOpacity || 0.8}
        disabled={disabled || isLoading}
        onPress={onPress}
        {...rest}>
        <View style={[styles.wrapper, buttonSize, style]}>
          {isLoading ? (
            <Spinner size="small" />
          ) : (
            <>
              {React.Children.toArray(children).map((child, index) => (
                <Fragment key={index}>
                  {typeof child === 'string' ? (
                    <Text button style={[styles.text, textStyle]}>
                      {child}
                    </Text>
                  ) : (
                    <>{child}</>
                  )}
                </Fragment>
              ))}
            </>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default Button;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    gap: 10,
  },
  text: {
    color: Colors.white,
  },
  pressed: {
    elevation: 10,
  },
  disabled: {
    opacity: 0.5,
  },
});
