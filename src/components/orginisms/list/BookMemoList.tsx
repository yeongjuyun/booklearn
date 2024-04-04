import {StyleSheet, TouchableOpacity, View, useColorScheme} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {BookStackParamList} from 'types/navigation';
import {BookMemo} from 'types/book';
import {Colors} from 'constants/theme';
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
    return (
      <View key={index}>
        <View style={styles.itemWrapper}>
          <View style={styles.itemHeader}>
            {item.page ? <Chip>P. {item.page}</Chip> : <View />}
            <View style={styles.itemHeaderLeft}>
              <Text caption>{item.createdAt}</Text>
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
      </View>
    );
  };

  return <View>{data.map((item, index) => renderItem({item, index}))}</View>;
};

export default BookMemoList;

const styles = StyleSheet.create({
  itemWrapper: {
    gap: 15,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
