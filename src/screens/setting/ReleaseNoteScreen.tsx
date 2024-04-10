import {useEffect, useState} from 'react';
import {Alert, Pressable, StyleSheet, View, useColorScheme} from 'react-native';
import Api from 'libs/axios/api';
import {StackNavigationProp} from '@react-navigation/stack';
import {ReleaseNote, ResponseType} from 'types/common';
import {SettingStackParamList} from 'types/navigation';
import {Colors, HIT_SLOP} from 'constants/theme';
import Icon from 'components/atoms/Icon';
import Text from 'components/atoms/Text';
import ListItem from 'components/molecules/ListItem';
import DefaultLayout from 'layouts/DefaultLayout';

type ReleaseNoteScreenProps = {
  navigation: StackNavigationProp<SettingStackParamList>;
};

const ReleaseNoteScreen = ({navigation}: ReleaseNoteScreenProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  const borderColor = isDarkMode ? Colors.dark.border : Colors.light.border;
  const listBackgroundColor = isDarkMode
    ? Colors.dark.surface
    : Colors.light.surface;

  const [releaseNotes, setReleaseNotes] = useState<ReleaseNote[]>([]);

  const handlePressReleaseNote = (title: string, content: string) => {
    navigation.navigate('ReleaseNoteDetail', {title, content});
  };

  const fetchReleaseNotes = () => {
    Api.default.getReleaseNotes(undefined, response => {
      if (response.type === ResponseType.SUCCESS) {
        setReleaseNotes(response.data);
      } else {
        Alert.alert('릴리즈 노트 조회 실패', response.message, [
          {text: '확인'},
        ]);
      }
    });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchReleaseNotes);
    return unsubscribe;
  }, [navigation]);

  return (
    <DefaultLayout
      headerTitle="릴리즈 노트"
      headerLeftContent={
        <Pressable hitSlop={HIT_SLOP} onPress={() => navigation.goBack()}>
          <Icon name="arrow_back" size={20} />
        </Pressable>
      }>
      <View
        style={[
          styles.listWrapper,
          {borderColor: borderColor, backgroundColor: listBackgroundColor},
        ]}>
        {releaseNotes.map((releaseNote, index) => {
          return (
            <ListItem
              key={index}
              title={releaseNote.title}
              endContent={<Text>{releaseNote.date}</Text>}
              onPress={() =>
                handlePressReleaseNote(releaseNote.title, releaseNote.content)
              }
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
