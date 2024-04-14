import React, {useEffect, useMemo, useState} from 'react';
import {
  Alert,
  Image,
  Platform,
  Pressable,
  ScrollView,
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
import {BookDetail, MemoSortType} from 'types/book';
import {INIT_BOOK_MEMO} from 'constants/init';
import {Colors, HIT_SLOP} from 'constants/theme';
import Icon from 'components/atoms/Icon';
import Text from 'components/atoms/Text';
import Button from 'components/atoms/Button';
import Spinner from 'components/atoms/Spinner';
import {ActionSheet, ActionSheetItem} from 'components/atoms/ActionSheet';
import BookMemoList from 'components/orginisms/list/BookMemoList';
import DefaultLayout from 'layouts/DefaultLayout';

type BookNoteDetailScreenProps = {
  navigation: StackNavigationProp<BookStackParamList>;
};

type BookNoteDetailScreenRouteProp = RouteProp<BookStackParamList, 'Detail'>;

const BookNoteDetailScreen = ({navigation}: BookNoteDetailScreenProps) => {
  const route = useRoute<BookNoteDetailScreenRouteProp>();

  const isDarkMode = useColorScheme() === 'dark';
  const bookCoverBorderColor = isDarkMode
    ? Colors.dark.border
    : Colors.light.border;

  const [bookDetail, setBookDetail] = useState<BookDetail>();
  const [memoSortType, setMemoSortType] = useState<MemoSortType>(
    MemoSortType.LATEST,
  );
  const [memoSortVisible, setMemoSortVisible] = useState<boolean>(false);
  const [memoSettingVisible, setMemoSettingVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sortedBookMemoList = useMemo(() => {
    if (!bookDetail || !Array.isArray(bookDetail.memoList)) {
      return [];
    }

    let sortedMemos = [...bookDetail.memoList];
    switch (memoSortType) {
      case MemoSortType.LATEST:
        sortedMemos.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        break;
      case MemoSortType.OLDEST:
        sortedMemos.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        );
        break;
      case MemoSortType.PAGE_ASC:
        sortedMemos.sort((a, b) => a.page - b.page);
        break;
      case MemoSortType.PAGE_DESC:
        sortedMemos.sort((a, b) => b.page - a.page);
        break;
      default:
        sortedMemos = [...bookDetail.memoList];
        break;
    }
    return sortedMemos;
  }, [bookDetail, memoSortType]);

  console.log('sortedBookMemoList', sortedBookMemoList);

  useEffect(() => {
    const fetchBookDetail = () => {
      const payload = {bookshelfId: route.params.id};
      Api.bookshelf.getBookshelfById(payload, response => {
        if (response.type === ResponseType.SUCCESS) {
          const {id, book, memos, essay} = response.data;
          setBookDetail({
            bookshelfId: id,
            id: book.id,
            isbn: book.isbn,
            title: book.title,
            cover: book.cover,
            author: book.author,
            publisher: book.publisher,
            memoList: memos,
            essay: essay,
          });
        } else {
          Alert.alert('', response.message, [{text: '확인'}]);
        }
      });
    };

    const unsubscribe = navigation.addListener('focus', fetchBookDetail);
    return unsubscribe;
  }, [navigation, route.params?.id]);

  const deleteBook = () => {
    if (!bookDetail?.bookshelfId) {
      return Alert.alert('', '책을 삭제하는 동안 오류가 발생했습니다', [
        {text: '확인'},
      ]);
    }

    setIsLoading(true);

    const payload = {id: bookDetail.bookshelfId};
    Api.bookshelf.deleteBookshelfById(payload, response => {
      if (response.type === ResponseType.SUCCESS) {
        navigation.navigate('Bookshelf');
      } else {
        Alert.alert('', response.message, [{text: '확인'}]);
      }
      handleCancelSetting();
      setIsLoading(false);
    });
  };

  const handlePressSort = () => {
    setMemoSortVisible(true);
  };

  const handleCancelSort = () => {
    setMemoSortVisible(false);
  };

  const handlePressSortOption = (type: MemoSortType) => {
    setMemoSortType(type);
    setMemoSortVisible(false);
  };

  const handlePressSetting = () => {
    setMemoSettingVisible(true);
  };

  const handleCancelSetting = () => {
    setMemoSettingVisible(false);
  };

  const handlePressEssay = () => {
    if (bookDetail) {
      navigation.navigate('Essay', {
        id: bookDetail.bookshelfId,
        essay: bookDetail.essay,
      });
    } else {
      Alert.alert('에세이 조회 실패', '에세이 정보를 불러오는데 실패했습니다', [
        {text: '확인'},
      ]);
    }
  };

  const handlePressDeleteBook = () => {
    Alert.alert('삭제', '독서 기록을 삭제하시겠습니까?', [
      {text: '취소', style: 'cancel', onPress: handleCancelSetting},
      {text: '삭제', style: 'destructive', onPress: deleteBook},
    ]);
  };

  return (
    <DefaultLayout
      headerTitle="독서 기록"
      isSafeAreaView={false}
      headerLeftContent={
        <Pressable hitSlop={HIT_SLOP} onPress={() => navigation.goBack()}>
          <Icon name="arrow_back" size={20} />
        </Pressable>
      }
      headerRightContent={
        <Pressable hitSlop={HIT_SLOP} onPress={handlePressSetting}>
          <Icon name="more_horizontal" />
        </Pressable>
      }>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {bookDetail && (
            <>
              <ScrollView style={styles.base}>
                <View style={styles.bookDetailWrapper}>
                  <Image
                    source={{uri: bookDetail.cover}}
                    style={[styles.cover, {borderColor: bookCoverBorderColor}]}
                  />
                  <View style={styles.bookInfoWrapper}>
                    <Text h4 numberOfLines={2}>
                      {bookDetail.title}
                    </Text>
                    <View style={{flex: 1}}>
                      <Text caption>{bookDetail.author}</Text>
                      <Text caption>{bookDetail.publisher}</Text>
                    </View>
                    <Button size="m" onPress={handlePressEssay}>
                      에세이 보기
                    </Button>
                  </View>
                </View>
                <View style={styles.bookMemoWrapper}>
                  <View style={styles.bookMemoHeader}>
                    <Text h4>메모 {bookDetail.memoList.length}</Text>
                    <Pressable
                      hitSlop={HIT_SLOP}
                      style={styles.bookMemoSort}
                      onPress={handlePressSort}>
                      <Icon name="sort" />
                      <Text body>{memoSortType}</Text>
                    </Pressable>
                  </View>
                  <BookMemoList
                    bookId={bookDetail.id}
                    data={sortedBookMemoList}
                    navigation={navigation}
                  />
                </View>
              </ScrollView>
              <TouchableOpacity
                activeOpacity={1}
                style={styles.floatingButton}
                onPress={() =>
                  navigation.navigate('EditMemo', {
                    id: bookDetail.bookshelfId,
                    bookMemo: INIT_BOOK_MEMO,
                  })
                }>
                <Icon name="write" size={24} color={Colors.white} />
              </TouchableOpacity>
            </>
          )}
          {/* 정렬 ActionSheet */}
          <ActionSheet
            title="정렬 기준 선택"
            visible={memoSortVisible}
            onCancel={handleCancelSort}>
            {Object.values(MemoSortType).map(type => {
              return (
                <ActionSheetItem
                  key={type}
                  title={type}
                  isSelected={memoSortType === type}
                  onPress={() => handlePressSortOption(type)}
                />
              );
            })}
          </ActionSheet>
          {/* 네비게이션 우측 메뉴 ActionSheet */}
          <ActionSheet
            visible={memoSettingVisible}
            onCancel={handleCancelSetting}>
            <ActionSheetItem
              title={'삭제하기'}
              onPress={handlePressDeleteBook}
            />
          </ActionSheet>
        </>
      )}
    </DefaultLayout>
  );
};

export default BookNoteDetailScreen;

const styles = StyleSheet.create({
  base: {
    flex: 1,
    paddingHorizontal: 20,
  },
  spinnerWrapper: {
    flex: 1,
    marginBottom: 60, // layoutHeader 영역만큼 위로 올리기
  },
  bookDetailWrapper: {
    flexDirection: 'row',
    paddingBottom: 15,
    gap: 15,
  },
  cover: {
    width: 120,
    height: 170,
    borderRadius: 8,
    borderWidth: 1,
    resizeMode: 'cover',
  },
  bookInfoWrapper: {
    flex: 1,
    gap: 4,
  },
  bookMemoWrapper: {},
  bookMemoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  bookMemoSort: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    backgroundColor: Colors.primary,
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 3,
      },
      android: {
        elevation: 8,
      },
    }),
  },
});
