import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  TouchableHighlight,
  Image,
  Alert,
  Pressable,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {getTokensFromStorage} from 'libs/async-storage';
import Api from 'libs/axios/api';
import NoImage from 'assets/image/noimage.png';
import {ResponseType} from 'types/common';
import {Colors, HIT_SLOP} from 'constants/theme';
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

  const getBookshelf = () => {
    Api.bookshelf.getBookshelf(undefined, response => {
      if (response.type === ResponseType.SUCCESS) {
        setBooks(response.data);
      }
    });
  };

  useEffect(() => {
    const checkAccessToken = async () => {
      try {
        const {accessToken} = await getTokensFromStorage();
        console.log('accessToken', accessToken);
        if (!accessToken) {
          navigation.navigate('Auth');
        } else {
          getBookshelf();
        }
      } catch (error) {
        Alert.alert('로그인 오류', '로그인 정보를 확인할 수 없습니다', [
          {text: '확인'},
        ]);
      }
    };

    const unsubscribe = navigation.addListener('focus', checkAccessToken);
    return unsubscribe;
  }, [navigation]);

  const headerLogo = (
    <Text>
      <Text style={[styles.logo]}>Book</Text>
      <Text style={[styles.logo, {color: Colors.primary}]}>learn</Text>
    </Text>
  );

  const headerMenuIcons = (
    <>
      <Pressable
        hitSlop={HIT_SLOP}
        onPress={() => navigation.navigate('Search')}>
        <Icon name="add" size={32} />
      </Pressable>
      <Pressable
        hitSlop={HIT_SLOP}
        onPress={() => navigation.navigate('Setting')}>
        <Icon name="setting" />
      </Pressable>
    </>
  );

  return (
    <DefaultLayout
      headerLeftContent={headerLogo}
      headerRightContent={headerMenuIcons}>
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
    marginTop: 30,
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
