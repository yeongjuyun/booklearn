import {StyleSheet, TouchableOpacity, View, useColorScheme} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {BookStackParamList} from 'types/navigation';
import {BookMemo} from 'types/book';
import {Colors} from 'constants/theme';
import {formatDateTime} from 'utls/date';
import Divider from 'components/atoms/Divider';
import Chip from 'components/atoms/Chip';
import Icon from 'components/atoms/Icon';
import Text from 'components/atoms/Text';

type BookMemoListProps = {
  navigation: StackNavigationProp<BookStackParamList>;
  data: Array<BookMemo>;
  bookId: string;
};

const BookMemoList = ({navigation, data, bookId}: BookMemoListProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  const neutralColor = isDarkMode ? Colors.dark.neutral : Colors.light.neutral;

  const renderItem = ({item, index}: {item: BookMemo; index: number}) => {
    const isLastItem = index === data.length - 1;

    return (
      <View key={index}>
        <View style={styles.itemWrapper}>
          <View style={styles.itemHeader}>
            <Chip>{item.page ? `P. ${item.page}` : '미지정'}</Chip>
            <View style={styles.itemHeaderLeft}>
              <Text caption>{formatDateTime(item.createdAt, 'date')}</Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate('EditMemo', {id: bookId, bookMemo: item})
                }>
                <Icon name="edit" size={16} color={neutralColor} />
              </TouchableOpacity>
            </View>
          </View>
          <Text body numberOfLines={1000}>
            {item.content}
          </Text>
        </View>
        <Divider color={neutralColor} />
        {isLastItem && <View style={{marginBottom: 50}} />}
      </View>
    );
  };

  return (
    <>
      {data.length > 0 ? (
        data.map((item, index) => renderItem({item, index}))
      ) : (
        <View style={styles.emptyContainer}>
          <Text caption style={styles.emptyText}>
            작성된 메모가 없습니다
          </Text>
        </View>
      )}
    </>
  );
};

export default BookMemoList;

const styles = StyleSheet.create({
  itemWrapper: {
    gap: 24,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  emptyText: {
    alignSelf: 'center',
  },
});
