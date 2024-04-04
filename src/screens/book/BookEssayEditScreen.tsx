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

type BookEssayEditProps = {
  navigation: StackNavigationProp<RootStackParamList & BookStackParamList>;
};

function BookEssayEditScreen({navigation}: BookEssayEditProps) {
  const isDarkMode = useColorScheme() === 'dark';
  const [content, setContent] = useState('');
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const textInputRef = useRef<TextInput>(null);
  const handlePressSubmit = () => {
    console.log('SAVE');
    navigation.goBack();
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

  const errorColor = isDarkMode ? Colors.dark.error : Colors.light.error;

  const handleSubmitMemo = () => {
    console.log('submit');
  };

  const handlePressRemove = () => {
    Alert.alert('', '에세이를 삭제하시겠습니까?', [
      {
        text: '취소',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: '삭제',
        style: 'destructive',
        onPress: () => console.log('OK Pressed'),
      },
    ]);
  };

  return (
    <DefaultLayout
      headerTitle="에세이 작성"
      headerLeftContent={
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text body>닫기</Text>
        </TouchableOpacity>
      }
      headerRightContent={
        <TouchableOpacity onPress={handlePressSubmit}>
          <Text body style={{color: Colors.primary}}>
            저장
          </Text>
        </TouchableOpacity>
      }>
      <View style={styles.baseWrapper}>
        <Input
          placeholder="에세이 내용을 입력해주세요"
          multiline
          autoFocus
          style={styles.textarea}
        />
        <View style={styles.footerWrapper}>
          <TouchableOpacity activeOpacity={0.8} onPress={handlePressRemove}>
            <Text caption style={{color: errorColor}}>
              에세이 삭제
            </Text>
          </TouchableOpacity>
          <Text caption>작성일: 2024.03.03</Text>
        </View>
      </View>
    </DefaultLayout>
  );
}
export default BookEssayEditScreen;

const styles = StyleSheet.create({
  baseWrapper: {
    margin: 16,
  },
  textarea: {
    height: 300,
    alignItems: 'flex-start',
    padding: 10,
  },
  footerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
});
