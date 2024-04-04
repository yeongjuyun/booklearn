import React, {useEffect, useState} from 'react';
import {
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
import {Book} from 'types/book';
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

const MemoSortListItem = ['최신순', '오래된순', '페이지순', '페이지역순'];

const INIT_BOOK_MEMO = {
  id: '',
  page: 0,
  content: '',
  createdAt: '',
};

const BookNoteDetailScreen = ({navigation}: BookNoteDetailScreenProps) => {
  const route = useRoute<BookNoteDetailScreenRouteProp>();
  const [bookDetail, setBookDetail] = useState<Book>();
  const [memoSortIndex, setMemoSortIndex] = useState<number>(0);
  const [memoSortVisible, setMemoSortVisible] = useState<boolean>(false);

  const handlePressSort = () => {
    setMemoSortVisible(true);
  };

  const handleCancelSort = () => {
    setMemoSortVisible(false);
  };

  const handlePressSortOption = (index: number) => {
    setMemoSortIndex(index);
    setMemoSortVisible(false);
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

  if (!bookDetail) {
    return <Spinner />;
  }

  return (
    <DefaultLayout
      headerTitle="독서 기록"
      isSafeAreaView={false}
      headerLeftContent={
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow_back" size={20} />
        </TouchableOpacity>
      }
      headerRightContent={<Icon name="share" />}>
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
              <Text body>{MemoSortListItem[memoSortIndex]}</Text>
            </TouchableOpacity>
          </View>
          <BookMemoList
            bookId={bookDetail.id}
            data={bookDetail.memoList}
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
      <ActionSheet
        title="정렬 기준 선택"
        visible={memoSortVisible}
        onCancel={handleCancelSort}>
        {MemoSortListItem.map((item, index) => {
          return (
            <ActionSheetItem
              key={index}
              title={item}
              isSelected={memoSortIndex === index}
              onPress={() => handlePressSortOption(index)}
            />
          );
        })}
      </ActionSheet>
    </DefaultLayout>
  );
};

export default BookNoteDetailScreen;

const styles = StyleSheet.create({
  base: {
    flex: 1,
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

const MOCK_BOOK_DETAIL = {
  id: '123',
  title: '제목책제목책제목책제목책제목책제목책제목책제목책제목책제목책제목',
  cover: 'https://edit.org/images/cat/bookDetail-covers-big-2019101610.jpg',
  author: '작가작가작가작가작가작가작가작가작가작가작가',
  publish: '출판사출판사출판사출판사출판사출판사출판사출판사출판사',
};

const MOCK_BOOK_MEMO_LIST_DATA = [
  {
    id: '1',
    pageNum: 97,
    createdAt: '2024.03.03',
    content:
      '내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용',
  },
  {
    id: '2',
    pageNum: 3,
    createdAt: '2024.03.03',
    content:
      ' 내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용',
  },
  {
    id: '3',
    pageNum: 44,
    createdAt: '2024.03.03',
    content:
      '내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용',
  },
  {
    id: '4',
    pageNum: 44,
    createdAt: '2024.03.03',
    content:
      '내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용',
  },
];
