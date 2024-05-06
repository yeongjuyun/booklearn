import React, {
  forwardRef,
  ForwardRefRenderFunction,
  ReactNode,
  useRef,
  useState,
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
import Icon from './Icon';
import {ActionSheet, ActionSheetItem} from './ActionSheet';

interface SelectProps extends TextInputProps {
  options: {key: string; value: string}[];
  type?: string;
  value?: string;
  placeholder?: string;
  caption?: string;
  errorText?: string;
  isDisabled?: boolean;
  style?: StyleProp<ViewStyle>;
  onChangeOption: (option: {key: string; value: string}) => void;
}

const Input: ForwardRefRenderFunction<View, SelectProps> = (
  {
    options,
    type,
    placeholder,
    caption,
    errorText,
    isDisabled,
    style,
    onChangeOption,
  },
  ref,
) => {
  const [ActionSheetVisible, setActionSheetVisible] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<{
    key: string;
    value: string;
  }>();

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

  const handlePressSelect = () => {
    setActionSheetVisible(true);
  };

  const handlePressCancel = () => {
    setActionSheetVisible(false);
  };

  const handlePressOption = (option: {key: string; value: string}) => {
    onChangeOption(option);
    setSelectedOption(option);
    setActionSheetVisible(false);
  };

  return (
    <>
      <View style={styles.baseWrapper}>
        <Pressable
          onPress={handlePressSelect}
          style={[
            styles.textInputWrapper,
            isDisabled,
            errorText && errorStyle,
            inputWrapperStyle,
            style,
          ]}>
          <TextInput
            value={selectedOption?.value}
            placeholder={placeholder}
            placeholderTextColor={isDisabled ? disabledColor : placeholderColor}
            secureTextEntry={type === 'password'}
            autoComplete="off"
            readOnly
            editable={!isDisabled}
            selectionColor={Colors.primary}
            style={[styles.textInput, inputStyle]}
          />
          <View style={styles.endContent}>
            <Icon name={'expand_more'} />
          </View>
        </Pressable>
        {errorText ? (
          <Text style={errorTextStyle}>{errorText}</Text>
        ) : caption ? (
          <Text style={captionTextStyle}>{caption}</Text>
        ) : null}
      </View>
      <ActionSheet
        title="카테고리 선택"
        visible={ActionSheetVisible}
        onCancel={handlePressCancel}>
        {options.map(option => (
          <ActionSheetItem
            key={option.key}
            title={option.value}
            isSelected={selectedOption?.key === option.key}
            onPress={() => handlePressOption(option)}
          />
        ))}
      </ActionSheet>
    </>
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
