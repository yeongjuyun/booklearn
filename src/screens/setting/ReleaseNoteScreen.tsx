import {StyleSheet, TouchableOpacity, View, useColorScheme} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {SettingStackParamList} from 'types/navigation';
import Icon from 'components/atoms/Icon';
import Text from 'components/atoms/Text';
import DefaultLayout from 'layouts/DefaultLayout';
import ListItem from 'components/molecules/ListItem';
import {Colors} from 'constants/theme';

type ReleaseNoteScreenProps = {
  navigation: StackNavigationProp<SettingStackParamList>;
};

const ReleaseNoteScreen = ({navigation}: ReleaseNoteScreenProps) => {
  const isDarkMode = useColorScheme() === 'dark';

  const borderColor = isDarkMode ? Colors.dark.border : Colors.light.border;
  const listBackgroundColor = isDarkMode
    ? Colors.dark.surface
    : Colors.light.surface;

  const handlePressReleaseNote = (title: string) => {
    navigation.navigate('ReleaseNoteDetail', {title});
  };

  return (
    <DefaultLayout
      headerTitle="릴리즈 노트"
      headerLeftContent={
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow_back" size={20} />
        </TouchableOpacity>
      }>
      <View
        style={[
          styles.listWrapper,
          {borderColor: borderColor, backgroundColor: listBackgroundColor},
        ]}>
        {MOCK_DATA.map((item, index) => {
          return (
            <ListItem
              key={index}
              title={item.title}
              endContent={<Text>{item.createdAt}</Text>}
              onPress={() => handlePressReleaseNote(item.title)}
            />
          );
        })}
      </View>
    </DefaultLayout>
  );
};

export default ReleaseNoteScreen;

const styles = StyleSheet.create({
  listTitle: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginTop: 10,
  },
  listWrapper: {
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
  },
});

const MOCK_DATA = [
  {
    title: 'v.1.0.0 업데이트',
    content: 'v.1.0.0 업데이트 Content',
    createdAt: '2024-04-12',
  },
  {
    title: 'v.1.0.0 업데이트',
    content: 'v.1.0.0 업데이트 Content',
    createdAt: '2024-04-12',
  },
  {
    title: 'v.1.0.0 업데이트',
    content: 'v.1.0.0 업데이트 Content',
    createdAt: '2024-04-12',
  },
];
