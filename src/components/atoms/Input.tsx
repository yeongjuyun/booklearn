import React, {
  forwardRef,
  ForwardRefRenderFunction,
  ReactNode,
  useRef,
} from 'react';
import {
  TextInput,
  View,
  Pressable,
  Text,
  StyleSheet,
  StyleProp,
  TextInputProps,
  ViewStyle,
  useColorScheme,
} from 'react-native';
import {Colors} from 'constants/theme';

interface InputProps extends TextInputProps {
  type?: string;
  value?: string;
  placeholder?: string;
  caption?: string;
  errorText?: string;
  isDisabled?: boolean;
  style?: StyleProp<ViewStyle>;
  startContent?: ReactNode;
  endContent?: ReactNode;
}

const Input: ForwardRefRenderFunction<TextInput, InputProps> = (
  {
    type,
    value,
    placeholder,
    caption,
    errorText,
    isDisabled,
    style,
    startContent,
    endContent,
    ...props
  },
  ref,
) => {
  const textInputRef = useRef<TextInput>(null);
  const isDarkMode = useColorScheme() === 'dark';
  const textColor = isDarkMode ? Colors.dark.text : Colors.light.text;
  const placeholderColor = isDarkMode
    ? Colors.dark.placeholder
    : Colors.light.placeholder;
  const backgroundColor = isDarkMode
    ? Colors.dark.surface
    : Colors.light.surface;
  const disabledColor = isDarkMode
    ? Colors.dark.disabled_text
    : Colors.light.disabled_text;
  const errorColor = isDarkMode ? Colors.dark.error : Colors.light.error;
  const neutralColor = isDarkMode ? Colors.dark.neutral : Colors.light.neutral;

  const inputWrapperStyle = {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: backgroundColor,
    paddingHorizontal: 10,
  };
  const inputStyle = {color: isDisabled ? disabledColor : textColor};

  const errorStyle = {
    borderWidth: 1,
    borderColor: errorColor,
  };

  const captionTextStyle = {
    fontSize: 14,
    lineHeight: 20,
    color: neutralColor,
    marginTop: 6,
  };

  const errorTextStyle = {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 6,
    color: errorColor,
  };

  return (
    <View style={styles.baseWrapper}>
      <Pressable
        onPress={() => textInputRef.current?.focus()}
        style={[
          styles.textInputWrapper,
          isDisabled,
          errorText && errorStyle,
          inputWrapperStyle,
          style,
        ]}>
        {startContent && (
          <View style={styles.startContent}>{startContent}</View>
        )}
        <TextInput
          {...props}
          ref={ref || textInputRef}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={isDisabled ? disabledColor : placeholderColor}
          secureTextEntry={type === 'password'}
          autoComplete="off"
          editable={!isDisabled}
          selectionColor={Colors.primary}
          style={[styles.textInput, inputStyle]}
        />
        {endContent && <View style={styles.endContent}>{endContent}</View>}
      </Pressable>
      {errorText ? (
        <Text style={errorTextStyle}>{errorText}</Text>
      ) : caption ? (
        <Text style={captionTextStyle}>{caption}</Text>
      ) : null}
    </View>
  );
};

export default forwardRef(Input);

const styles = StyleSheet.create({
  baseWrapper: {},
  textInputWrapper: {},
  textInput: {
    flex: 1,
    fontSize: 16,
  },
  iconWrapper: {marginRight: 4},
  startContent: {alignItems: 'center', paddingRight: 10},
  endContent: {alignItems: 'center', paddingLeft: 10},
});
