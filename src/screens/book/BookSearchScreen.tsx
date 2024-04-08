import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View, useColorScheme} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from 'libs/axios/api';
import {BookStackParamList} from 'types/navigation';
import {ResponseType} from 'types/common';
import {Colors} from 'constants/theme';
import Divider from 'components/atoms/Divider';
import Icon from 'components/atoms/Icon';
import SearchInput from 'components/atoms/SearchInput';
import RecentSearchList from 'components/orginisms/list/RecentSearchList';
import SearchResultList from 'components/orginisms/list/SearchResultList';
import DefaultLayout from 'layouts/DefaultLayout';
import Text from 'components/atoms/Text';
import Spinner from 'components/atoms/Spinner';
import {Book} from 'types/book';

type BookSearchScreenProps = {
  navigation: StackNavigationProp<BookStackParamList>;
};

const BookSearchScreen = ({navigation}: BookSearchScreenProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  const dividerColor = isDarkMode ? Colors.dark.surface : Colors.light.surface;

  const [keywords, setKeywords] = useState<string[]>([]);
  const [keyword, setKeyword] = useState<string>('');
  const [searchedBooks, setSearchedBooks] = useState<Book[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadKeywords = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('keywords');
        const storedKeywords = jsonValue ? JSON.parse(jsonValue) : [];
        setKeywords(storedKeywords);
      } catch (error) {
        console.error('Error loading keywords from AsyncStorage:', error);
      }
    };
    loadKeywords();
  }, []);

  const storeKeyword = async (value: string) => {
    try {
      const updatedKeywords = [value, ...keywords.filter(kw => kw !== value)];
      await AsyncStorage.setItem('keywords', JSON.stringify(updatedKeywords));
      setKeywords(updatedKeywords);
    } catch (error) {
      console.error('Error storing keyword to AsyncStorage:', error);
    }
  };

  const removeKeyword = async (value: string) => {
    try {
      const updatedKeywords = keywords.filter(kw => kw !== value);
      await AsyncStorage.setItem('keywords', JSON.stringify(updatedKeywords));
      setKeywords(updatedKeywords);
    } catch (error) {
      console.error('Error removing keyword from AsyncStorage:', error);
    }
  };

  const removeAllKeywords = async () => {
    try {
      await AsyncStorage.removeItem('keywords');
      setKeywords([]);
    } catch (error) {
      console.error('Error removing all keywords from AsyncStorage:', error);
    }
  };

  const handleSubmitKeyword = (value?: string) => {
    const query = value || keyword;
    if (query.length < 1) {
      return;
    }

    setKeyword(query);
    storeKeyword(query);
    setIsLoading(true);
    const params = {query, count: 1000, page: 1};
    Api.book.getBooksByQuery(params, response => {
      if (response.type === ResponseType.SUCCESS) {
        setSearchedBooks(response.data.item);
      }
      setIsLoading(false);
    });
  };

  useEffect(() => {
    if (!keyword) {
      setSearchedBooks(null);
    }
  }, [keyword]);

  return (
    <DefaultLayout
      headerLeftContent={
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow_back" size={20} />
        </TouchableOpacity>
      }
      headerRightContent={
        <SearchInput
          value={keyword}
          placeholder="관심 있는 도서 검색"
          onChangeText={setKeyword}
          onSubmitEditing={handleSubmitKeyword}
        />
      }>
      <Divider color={dividerColor} />
      {isLoading ? (
        <Spinner />
      ) : keyword ? (
        Array.isArray(searchedBooks) ? (
          searchedBooks.length > 0 ? (
            <SearchResultList navigation={navigation} books={searchedBooks} />
          ) : (
            <View style={styles.centeredWrapper}>
              <Text>조회된 검색 결과가 없습니다</Text>
            </View>
          )
        ) : null
      ) : (
        <RecentSearchList
          keywords={keywords}
          onRemoveItem={removeKeyword}
          onRemoveAllItem={removeAllKeywords}
          onSubmitKeyword={handleSubmitKeyword}
        />
      )}
    </DefaultLayout>
  );
};

export default BookSearchScreen;

const styles = StyleSheet.create({
  centeredWrapper: {
    flex: 1,
    paddingBottom: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
