import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  TouchableHighlight,
  Image,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {getTokensFromStorage} from 'libs/async-storage';
import Api from 'libs/axios/api';
import NoImage from 'assets/image/noimage.png';
import {ResponseType} from 'types/common';
import {Colors} from 'constants/theme';
import {BookStackParamList, RootStackParamList} from 'types/navigation';
import Text from 'components/atoms/Text';
import Icon from 'components/atoms/Icon';
import DefaultLayout from 'layouts/DefaultLayout';

type BookNoteListScreenProps = {
  navigation: StackNavigationProp<RootStackParamList & BookStackParamList>;
};

const margin = 1;
const numColumns = 3;

const BookNoteListScreen = ({navigation}: BookNoteListScreenProps) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const [books, setBooks] = useState();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      try {
        const {accessToken} = await getTokensFromStorage();
        if (!accessToken) {
          navigation.navigate('Auth');
        } else {
          getBookshelf();
        }
      } catch (error) {
        console.log('Error checking login status:', error);
      }
    });

    return unsubscribe;
  }, [navigation]);

  const getBookshelf = () => {
    Api.bookshelf.getBookshelf(undefined, response => {
      if (response.type === ResponseType.SUCCESS) {
        setBooks(response.data);
      }
    });
  };

  const headerLeftComponents = (
    <Text>
      <Text style={[styles.logo]}>Book</Text>
      <Text style={[styles.logo, {color: Colors.primary}]}>learn</Text>
    </Text>
  );

  const headerRightComponents = (
    <>
      <TouchableOpacity onPress={() => navigation.navigate('Search')}>
        <Icon name="add" size={32} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
        <Icon name="setting" />
      </TouchableOpacity>
    </>
  );

  return (
    <DefaultLayout
      headerRightContent={headerRightComponents}
      headerLeftContent={headerLeftComponents}>
      <FlatList
        data={books}
        ListEmptyComponent={
          <View style={styles.emptyListContainer}>
            <Text>조회된 책이 없습니다</Text>
          </View>
        }
        columnWrapperStyle={styles.flatListColumnWrapper}
        onLayout={e => setContainerWidth(e.nativeEvent.layout.width)}
        numColumns={numColumns}
        renderItem={({item}) => {
          return (
            <TouchableHighlight
              onPress={() => navigation.navigate('Detail', {id: `${item.id}`})}>
              <Image
                source={{uri: item.book.cover}}
                defaultSource={NoImage}
                style={{
                  width: (containerWidth - margin * 2) / numColumns,
                  height: 180,
                }}
              />
            </TouchableHighlight>
          );
        }}
      />
    </DefaultLayout>
  );
};
export default BookNoteListScreen;

const styles = StyleSheet.create({
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  flatListColumnWrapper: {
    gap: margin,
    marginBottom: 1,
  },
});
