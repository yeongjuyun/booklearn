import {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Keyboard,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp, useRoute} from '@react-navigation/native';
import {BookStackParamList, RootStackParamList} from 'types/navigation';
import {Colors, HIT_SLOP} from 'constants/theme';
import Text from 'components/atoms/Text';
import Input from 'components/atoms/Input';
import DefaultLayout from 'layouts/DefaultLayout';
import useInputs from 'hooks/useInputs';
import {formatDateTime} from 'utils/date';
import Api from 'libs/axios/api';
import {ResponseType} from 'types/common';

type BookEssayEditProps = {
  navigation: StackNavigationProp<RootStackParamList & BookStackParamList>;
};

type BookEssayScreenRouteProp = RouteProp<BookStackParamList, 'Essay'>;

function BookEssayEditScreen({navigation}: BookEssayEditProps) {
  const route = useRoute<BookEssayScreenRouteProp>();

  const isDarkMode = useColorScheme() === 'dark';
  const errorColor = isDarkMode ? Colors.dark.error : Colors.light.error;

  const {values, handleChange} = useInputs({
    bookshelfId: route.params.id,
    id: route.params.essay.id,
    content: route.params.essay.content,
    createdAt: route.params.essay.createdAt,
    updatedAt: route.params.essay.updatedAt,
  });

  const createBookEssay = () => {
    const payload = {bookshelfId: values.bookshelfId, content: values.content};
    Api.bookshelf.postBookEssay(payload, response => {
      if (response.type === ResponseType.SUCCESS) {
        navigation.navigate('Essay', {id: values.bookshelfId, essay: values});
      } else {
        Alert.alert('에세이 저장 실패', response.message, [{text: '확인'}]);
      }
    });
  };

  const updateBookEssay = () => {
    const payload = {
      bookshelfId: values.bookshelfId,
      essayId: values.id,
      content: values.content,
    };
    Api.bookshelf.patchBookEssay(payload, response => {
      if (response.type === ResponseType.SUCCESS) {
        navigation.navigate('Essay', {id: values.bookshelfId, essay: values});
      } else {
        Alert.alert('에세이 저장 실패', response.message, [{text: '확인'}]);
      }
    });
  };

  const deleteBookEssay = () => {
    const payload = {bookshelfId: values.bookshelfId, essayId: values.id};
    Api.bookshelf.deleteBookEssayById(payload, response => {
      if (response.type === ResponseType.SUCCESS) {
        navigation.navigate('Detail', {id: values.bookshelfId});
      } else {
        Alert.alert('에세이 삭제 실패', response.message, [{text: '확인'}]);
      }
    });
  };

  const handlePressSave = () => {
    if (values.id) {
      updateBookEssay();
    } else {
      createBookEssay();
    }
  };

  const handlePressDelete = () => {
    Alert.alert('삭제', '에세이를 삭제하시겠습니까?', [
      {text: '취소', style: 'cancel'},
      {text: '삭제', style: 'destructive', onPress: deleteBookEssay},
    ]);
  };

  return (
    <DefaultLayout
      headerTitle={values.id ? '에세이 수정' : '에세이 작성'}
      headerLeftContent={
        <Pressable hitSlop={HIT_SLOP} onPress={() => navigation.goBack()}>
          <Text body>닫기</Text>
        </Pressable>
      }
      headerRightContent={
        <Pressable hitSlop={HIT_SLOP} onPress={handlePressSave}>
          <Text body style={{color: Colors.primary}}>
            저장
          </Text>
        </Pressable>
      }>
      <View style={styles.baseWrapper}>
        <Input
          placeholder="에세이 내용을 입력해주세요"
          value={values.content}
          multiline
          autoFocus
          style={styles.textarea}
          onChangeText={text => handleChange('content', text)}
        />
        <View style={styles.footerWrapper}>
          {values.id && (
            <TouchableOpacity activeOpacity={0.8} onPress={handlePressDelete}>
              <Text caption style={{color: errorColor}}>
                에세이 삭제
              </Text>
            </TouchableOpacity>
          )}
          {values.createdAt && (
            <Text caption>{`작성일: ${formatDateTime(
              values.createdAt,
              'date',
            )}`}</Text>
          )}
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
