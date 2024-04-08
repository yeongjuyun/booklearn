import React, {useEffect, useMemo, useState} from 'react';
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Api from 'libs/axios/api';
import {ResponseType} from 'types/common';
import {BookStackParamList} from 'types/navigation';
import {Book, MemoSortType} from 'types/book';
import {INIT_BOOK_MEMO} from 'constants/init';
import {Colors} from 'constants/theme';
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
  const [bookDetail, setBookDetail] = useState<Book>();
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

  const handlePressDeleteBook = () => {
    //TODO: 책 삭제 API 테스트 필요
    Alert.alert('삭제', '책을 삭제하시겠습니까?', [
      {text: '취소', style: 'cancel', onPress: handleCancelSetting},
      {
        text: '삭제',
        style: 'destructive',
        onPress: () => {
          if (!bookDetail?.id) {
            return Alert.alert(
              '요청 실패',
              '책을 삭제하는 동안 오류가 발생했습니다',
            );
          }

          setIsLoading(true);

          const payload = {id: bookDetail.id};
          Api.bookshelf.deleteBookshelfById(payload, response => {
            //TODO: 로딩처리, 기능 확인
            console.log('response', response);
            if (response.type === ResponseType.SUCCESS) {
              navigation.navigate('Main');
            } else {
              Alert.alert('요청 실패', response.message);
            }
            handleCancelSetting();
            setIsLoading(false);
          });
        },
      },
    ]);
  };

  useEffect(() => {
    const fetchBookDetailData = () => {
      Api.bookshelf.getBookshelfById({id: route.params?.id || ''}, response => {
        if (response.type === ResponseType.SUCCESS) {
          const {id, book, memos, essay} = response.data;
          setBookDetail({
            id: book.id,
            isbn: book.isbn,
            title: book.title,
            cover: book.cover,
            author: book.author,
            publisher: book.publisher,
            memoList: memos,
            essay: essay,
          });
        }
      });
    };

    const unsubscribe = navigation.addListener('focus', () => {
      fetchBookDetailData();
    });

    return unsubscribe;
  }, [navigation, route.params?.id]);

  return (
    <DefaultLayout
      headerTitle="독서 기록"
      isSafeAreaView={false}
      headerLeftContent={
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow_back" size={20} />
        </TouchableOpacity>
      }
      headerRightContent={
        <TouchableOpacity onPress={handlePressSetting}>
          <Icon name="more_horizontal" />
        </TouchableOpacity>
      }>
      {!bookDetail ? (
        <View style={styles.spinnerWrapper}>
          <Spinner />
        </View>
      ) : (
        <>
          <ScrollView style={styles.base}>
            <View style={styles.bookDetailWrapper}>
              <Image source={{uri: bookDetail.cover}} style={styles.cover} />
              <View style={styles.bookInfoWrapper}>
                <Text h4 numberOfLines={2}>
                  {bookDetail.title}
                </Text>
                <View style={{flex: 1}}>
                  <Text caption>{bookDetail.author}</Text>
                  <Text caption>{bookDetail.publisher}</Text>
                </View>
                <Button size="m" onPress={() => navigation.navigate('Essay')}>
                  에세이 보기
                </Button>
              </View>
            </View>
            <View style={styles.bookMemoWrapper}>
              <View style={styles.bookMemoHeader}>
                <Text h4>메모 {bookDetail.memoList.length}</Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.bookMemoSort}
                  onPress={handlePressSort}>
                  <Icon name="sort" />
                  <Text body>{memoSortType}</Text>
                </TouchableOpacity>
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
                id: bookDetail.id,
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
      <ActionSheet visible={memoSettingVisible} onCancel={handleCancelSetting}>
        <ActionSheetItem title={'삭제하기'} onPress={handlePressDeleteBook} />
      </ActionSheet>
    </DefaultLayout>
  );
};

export default BookNoteDetailScreen;

const styles = StyleSheet.create({
  base: {
    flex: 1,
  },
  spinnerWrapper: {
    flex: 1,
    marginBottom: 60, // layoutHeader 영역만큼 위로 올리기
  },
  bookDetailWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  cover: {
    width: 120,
    height: 170,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  bookInfoWrapper: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    gap: 4,
  },
  bookMemoWrapper: {},
  bookMemoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
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
