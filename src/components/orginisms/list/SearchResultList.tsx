import React from 'react';
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Api from 'libs/axios/api';
import {StackNavigationProp} from '@react-navigation/stack';
import NoImage from 'assets/image/noimage.png';
import {ResponseType} from 'types/common';
import {BookStackParamList} from 'types/navigation';
import {Book} from 'types/book';
import Text from 'components/atoms/Text';

type SearchResultListProps = {
  navigation: StackNavigationProp<BookStackParamList>;
  books: Book[];
};

const SearchResultList = ({navigation, books}: SearchResultListProps) => {
  const postBooksToBookShelf = (isbn: string) => {
    Api.bookshelf.postBookshelf({isbnList: [isbn]}, response => {
      if (response.type === ResponseType.SUCCESS) {
        navigation.navigate('Main');
      } else {
        Alert.alert('요청 실패', `${response.message}`);
      }
    });
  };

  const renderItem = ({item, index}: {item: Book; index: number}) => {
    const handlePressItem = () => {
      Alert.alert('', `${item.title} 책을 추가하시겠습니까?`, [
        {text: '취소', style: 'cancel'},
        {text: '추가', onPress: () => postBooksToBookShelf(item.isbn)},
      ]);
    };

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.searchItemWrapper}
        onPress={handlePressItem}>
        <Image
          source={{uri: item.cover}}
          defaultSource={NoImage}
          style={styles.cover}
        />
        <View style={styles.bookInfoWrapper}>
          <Text body>{item.title}</Text>
          <Text caption>{item.author}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={books}
      keyExtractor={item => item.isbn}
      showsVerticalScrollIndicator={false}
      style={styles.flatList}
      renderItem={renderItem}
    />
  );
};

export default SearchResultList;

const styles = StyleSheet.create({
  flatList: {
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  searchItemWrapper: {
    flexDirection: 'row',
    padding: 10,
    borderRadius: 4,
    marginBottom: 10,
    gap: 10,
  },
  bookInfoWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 5,
  },
  cover: {
    width: 48,
    height: 65,
    borderRadius: 4,
  },
});
