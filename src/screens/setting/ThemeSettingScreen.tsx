import {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View, useColorScheme} from 'react-native';
import {
  loadThemePreference,
  saveThemePreference,
} from 'libs/async-storage/theme';
import {StackNavigationProp} from '@react-navigation/stack';
import {SettingStackParamList} from 'types/navigation';
import {Colors} from 'constants/theme';
import Icon from 'components/atoms/Icon';
import ListItem from 'components/molecules/ListItem';
import DefaultLayout from 'layouts/DefaultLayout';

type ThemeSettingScreenProps = {
  navigation: StackNavigationProp<SettingStackParamList>;
};

const ThemeSettingScreen = ({navigation}: ThemeSettingScreenProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [isDarkTheme, setIsDarkTheme] = useState(isDarkMode);

  const borderColor = isDarkMode ? Colors.dark.border : Colors.light.border;
  const listBackgroundColor = isDarkMode
    ? Colors.dark.surface
    : Colors.light.surface;

  useEffect(() => {
    loadThemePreference().then(theme => {
      setIsDarkTheme(theme);
    });
  }, []);

  const handleThemeChange = async (theme: boolean) => {
    setIsDarkTheme(theme);
    await saveThemePreference(theme);
  };

  return (
    <DefaultLayout
      headerTitle="테마 설정"
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
        <ListItem
          title={'라이트 모드'}
          endContent={!isDarkTheme && <Icon name="check" />}
          onPress={() => handleThemeChange(false)}
        />
        <ListItem
          title={'다크 모드'}
          endContent={isDarkTheme && <Icon name="check" />}
          onPress={() => handleThemeChange(true)}
        />
      </View>
    </DefaultLayout>
  );
};

export default ThemeSettingScreen;

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
