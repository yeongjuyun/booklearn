import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {BookStackParamList} from 'types/navigation';
import {Colors} from 'constants/theme';
import Icon from 'components/atoms/Icon';
import Text from 'components/atoms/Text';
import ListItem from 'components/molecules/ListItem';

type RecentSearchListProps = {
  keywords: string[];
  onRemoveItem: (keyword: string) => void;
  onRemoveAllItem: () => void;
  onSubmitKeyword: (value: string) => void;
};

const RecentSearchList = ({
  keywords,
  onRemoveItem,
  onRemoveAllItem,
  onSubmitKeyword,
}: RecentSearchListProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  const NeutralColor = isDarkMode ? Colors.dark.neutral : Colors.light.neutral;

  const renderItem = ({item, index}: {item: string; index: number}) => {
    return (
      <ListItem
        title={item}
        endContent={
          <TouchableOpacity onPress={() => onRemoveItem(item)}>
            <Icon name="close" size={20} color={NeutralColor} />
          </TouchableOpacity>
        }
        onPress={() => onSubmitKeyword(item)}
      />
    );
  };

  return (
    <View style={styles.baseWrapper}>
      <View style={styles.recentSearchHeaderWrapper}>
        <Text h6 style={{color: NeutralColor}}>
          최근 검색어
        </Text>
        <TouchableOpacity onPress={onRemoveAllItem}>
          <Text caption>전체 삭제</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={keywords}
        keyExtractor={item => item}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
      />
    </View>
  );
};

export default RecentSearchList;

const styles = StyleSheet.create({
  baseWrapper: {height: '100%', flexDirection: 'column', gap: 10},
  recentSearchHeaderWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 10,
  },
});
