import React, {useRef} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  StyleProp,
  TextInputProps,
  ViewStyle,
  Pressable,
  Keyboard,
  useColorScheme,
} from 'react-native';
import {Colors} from 'constants/theme';
import Icon from './Icon';

export interface SearchInputProps extends TextInputProps {
  value?: string;
  placeholder: string;
  maxLength?: number;
  editable?: boolean;
  autoFocus?: boolean;
  style?: StyleProp<ViewStyle>;
  onChangeText: (text: string) => void;
  onCancel?: () => void;
  onSubmitEditing: () => void;
}

const SearchInput = ({
  value,
  placeholder,
  maxLength,
  editable = true,
  autoFocus = true,
  style,
  onChangeText,
  onSubmitEditing,
  ...props
}: SearchInputProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  const textInputRef = useRef<TextInput>(null);

  const placeholderColor = isDarkMode
    ? Colors.dark.placeholder
    : Colors.dark.placeholder;
  const textInputColor = {
    color: isDarkMode ? Colors.dark.text : Colors.light.text,
  };
  const textInputBackgroundColor = {
    backgroundColor: isDarkMode ? Colors.dark.surface : Colors.light.surface,
  };

  const handleSubmitEditing = () => {
    Keyboard.dismiss();
    onSubmitEditing();
  };

  const handlePressReset = () => {
    onChangeText('');
    textInputRef.current?.focus();
  };

  return (
    <View style={styles.baseWrapper}>
      <View style={[styles.textInputWrapper, textInputBackgroundColor, style]}>
        <Icon
          name={'search'}
          color={placeholderColor}
          style={{marginRight: 8}}
        />
        <TextInput
          ref={textInputRef}
          value={value}
          placeholder={placeholder}
          maxLength={maxLength}
          editable={editable}
          autoFocus={autoFocus}
          autoComplete="off"
          cursorColor={Colors.primary}
          placeholderTextColor={placeholderColor}
          style={[styles.textInput, textInputColor]}
          onSubmitEditing={handleSubmitEditing}
          onChangeText={onChangeText}
          {...props}
        />
        {value && editable && (
          <Pressable onPress={handlePressReset}>
            <Icon
              name={'cancel_fill'}
              size={20}
              color={placeholderColor}
              style={{marginLeft: 4}}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  baseWrapper: {flexDirection: 'row', alignItems: 'center'},
  textInputWrapper: {
    height: 45,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    borderColor: 'transparent',
  },
});
