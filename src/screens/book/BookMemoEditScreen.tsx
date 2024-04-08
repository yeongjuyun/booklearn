import {useState} from 'react';
import {
  Alert,
  StyleSheet,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Api from 'libs/axios/api';
import {ResponseType} from 'types/common';
import {BookStackParamList} from 'types/navigation';
import {Colors} from 'constants/theme';
import {formatDateTime} from 'utls/date';
import Text from 'components/atoms/Text';
import Icon from 'components/atoms/Icon';
import Input from 'components/atoms/Input';
import DefaultLayout from 'layouts/DefaultLayout';

type BookMemoEditScreenProps = {
  navigation: StackNavigationProp<BookStackParamList>;
};

type BookMemoEditScreenRouteProp = RouteProp<BookStackParamList, 'EditMemo'>;

function BookMemoEditScreen({navigation}: BookMemoEditScreenProps) {
  const route = useRoute<BookMemoEditScreenRouteProp>();
  const [inputs, setInputs] = useState({
    bookId: route.params?.id || '',
    id: route.params?.bookMemo.id || '',
    page: route.params?.bookMemo.page.toString() ?? '',
    content: route.params?.bookMemo.content || '',
    createdAt: route.params?.bookMemo.createdAt || '',
  });

  const isDarkMode = useColorScheme() === 'dark';
  const errorColor = isDarkMode ? Colors.dark.error : Colors.light.error;

  const handleSubmitMemo = () => {
    console.log('submit', inputs);
    if (inputs.id) {
      // Edit
    } else {
      // New
      const payload = {
        // TODO: id 값 API 수정되면 반영 필요
        id: inputs.bookId,
        page: Number(inputs.page),
        content: inputs.content,
      };
      Api.bookshelf.postBookMemo(payload, response => {
        if (response.type === ResponseType.SUCCESS) {
          navigation.navigate('Detail', {id: inputs.bookId});
        }
      });
    }
  };

  const handlePressDelete = () => {
    // TODO: 메모삭제
    navigation.navigate('Detail', {id: inputs.bookId});
  };

  const handlePressRemoveMemo = () => {
    Alert.alert('', '메모를 삭제하시겠습니까?', [
      {text: '취소', style: 'cancel'},
      {text: '삭제', style: 'destructive', onPress: handlePressDelete},
    ]);
  };

  const handlePressClose = () => {
    if (
      inputs.page !== route.params?.bookMemo.page.toString() ||
      inputs.content !== route.params?.bookMemo.content
    ) {
      Alert.alert(
        '',
        '작성중인 내용이 저장되지 않았습니다. \n 작성을 취소하시겠습니까?',
        [
          {text: '취소', style: 'cancel'},
          {text: '확인', onPress: () => navigation.goBack()},
        ],
      );
    } else {
      navigation.goBack();
    }
  };

  return (
    <DefaultLayout
      headerTitle="메모 작성"
      headerLeftContent={
        <TouchableOpacity onPress={handlePressClose}>
          <Text body>닫기</Text>
        </TouchableOpacity>
      }
      headerRightContent={
        <TouchableOpacity onPress={handleSubmitMemo}>
          <Text body style={{color: Colors.primary}}>
            저장
          </Text>
        </TouchableOpacity>
      }>
      <View style={styles.baseWrapper}>
        <Text sub style={{marginBottom: 10}}>
          페이지 번호
        </Text>
        <View style={styles.headerWrapper}>
          <Input
            keyboardType="number-pad"
            placeholder="페이지"
            value={inputs.page === '0' ? '' : inputs.page}
            maxLength={5}
            style={styles.input}
            startContent={
              <Text h6 style={styles.inputStartContent}>
                P.
              </Text>
            }
            onChangeText={text => setInputs({...inputs, page: text})}
          />
          {/* TODO: 사진촬영, 갤러리 이미지 업로드 */}
          {/* <View style={styles.iconWrapper}>
            <TouchableOpacity>
              <Icon name="camera" size={28} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="gallery" size={28} />
            </TouchableOpacity>
          </View> */}
        </View>
        <Input
          placeholder="메모 내용을 입력해주세요"
          value={inputs.content}
          multiline
          autoFocus
          style={styles.textarea}
          onChangeText={text => setInputs({...inputs, content: text})}
        />
        <View style={styles.footerWrapper}>
          {inputs.id && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handlePressRemoveMemo}>
              <Text caption style={{color: errorColor}}>
                메모 삭제
              </Text>
            </TouchableOpacity>
          )}
          <Text caption>
            {inputs.createdAt
              ? `작성일: ${formatDateTime(inputs.createdAt, 'date')}`
              : ''}
          </Text>
        </View>
      </View>
    </DefaultLayout>
  );
}
export default BookMemoEditScreen;

const styles = StyleSheet.create({
  baseWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconWrapper: {
    flexDirection: 'row',
    gap: 10,
  },
  footerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  input: {
    width: 95,
    height: 45,
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  inputStartContent: {
    color: Colors.primary,
    paddingRight: 2,
  },
  textarea: {
    height: 200,
    alignItems: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});
