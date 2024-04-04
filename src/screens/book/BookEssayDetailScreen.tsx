import {StackNavigationProp} from '@react-navigation/stack';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  useColorScheme,
} from 'react-native';
import DefaultLayout from 'layouts/DefaultLayout';
import Text from 'components/atoms/Text';
import {BookStackParamList, RootStackParamList} from 'types/navigation';
import Icon from 'components/atoms/Icon';
import {Colors} from 'constants/theme';
import Input from 'components/atoms/Input';
import {useEffect, useRef, useState} from 'react';
import Divider from 'components/atoms/Divider';
import Button from 'components/atoms/Button';

type BookEssayDetailProps = {
  navigation: StackNavigationProp<RootStackParamList & BookStackParamList>;
};

function BookEssayDetailScreen({navigation}: BookEssayDetailProps) {
  const isDarkMode = useColorScheme() === 'dark';
  const [content, setContent] = useState('');
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const textInputRef = useRef<TextInput>(null);
  const handlePressEdit = () => {
    // navigation.navigate('EditEssay');
    setIsEditMode(prev => !prev);
  };

  useEffect(() => {
    if (isEditMode) {
      textInputRef.current?.focus();
    } else {
      Keyboard.dismiss();
    }
  }, [isEditMode]);

  const backgroundColor = isDarkMode
    ? Colors.dark.background
    : Colors.light.background;
  const bottomControlBackgroundColor = isDarkMode
    ? Colors.dark.surface
    : Colors.light.surface;
  const textColor = isDarkMode ? Colors.dark.text : Colors.light.text;
  const inputStyle = {color: textColor};
  const buttonControlStyle = {
    backgroundColor: bottomControlBackgroundColor,
    // marginBottom: Platform.OS === 'ios' ? (isEditMode ? 48 : 0) : isEditMode ? 20 : 0,
  };

  useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        if (!isEditMode) {
          // If we don't have unsaved changes, then we don't need to do anything
          return;
        }

        // Prevent default behavior of leaving the screen
        e.preventDefault();

        if (isEditMode) {
          // Prompt the user before leaving the screen
          Alert.alert(
            'Discard changes?',
            'You have unsaved changes. Are you sure to discard them and leave the screen?',
            [
              {text: "Don't leave", style: 'cancel', onPress: () => {}},
              {
                text: 'Discard',
                style: 'destructive',
                // If the user confirmed, then we dispatch the action we blocked earlier
                // This will continue the action that had triggered the removal of the screen
                onPress: () => navigation.dispatch(e.data.action),
              },
            ],
          );
        }
      }),
    [navigation, isEditMode],
  );

  return (
    <DefaultLayout
      headerTitle="에세이 보기"
      // backgroundColor={backgroundColor}
      isSafeAreaView={isEditMode}
      headerLeftContent={
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow_back" size={20} />
        </TouchableOpacity>
      }
      headerRightContent={
        <TouchableOpacity onPress={() => navigation.navigate('EditEssay')}>
          <Text body style={{color: Colors.primary}}>
            편집
          </Text>
        </TouchableOpacity>
      }>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <TextInput
          ref={textInputRef}
          placeholder="내용을 입력해주세요"
          value={content}
          multiline
          editable={false}
          style={[styles.textInput, inputStyle]}
          onChangeText={text => setContent(text)}
        />
      </ScrollView>
      {/* {isEditMode ? (
        <>
          <KeyboardAvoidingView
            keyboardVerticalOffset={Platform.OS === 'ios' ? 48 : 25}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[styles.baseWrapper, { backgroundColor: backgroundColor }]}>
            <TextInput
              ref={textInputRef}
              placeholder="내용을 입력해주세요"
              value={content}
              numberOfLines={30}
              multiline
              editable={true}
              style={[styles.textInput, inputStyle]}
              onChangeText={text => setContent(text)}
            />
            {isEditMode && (
              <View style={[styles.bottomControlWrapper, buttonControlStyle]}>
                <Icon name="camera" size={26} />
                <Icon name="gallery" size={26} />
              </View>
            )}
          </KeyboardAvoidingView>
        </>
      ) : (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <TextInput
            ref={textInputRef}
            placeholder="내용을 입력해주세요"
            value={content}
            multiline
            editable={false}
            style={[styles.textInput, inputStyle]}
            onChangeText={text => setContent(text)}
          />
        </ScrollView>
      )} */}
    </DefaultLayout>
  );
}
export default BookEssayDetailScreen;

const styles = StyleSheet.create({
  baseWrapper: {
    flex: 1,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    textAlignVertical: 'top',
    padding: 16,
  },
  bottomControlWrapper: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 15,
  },
});
