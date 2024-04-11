import {Pressable, StyleSheet, View, useColorScheme} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {SettingStackParamList} from 'types/navigation';
import {Colors, HIT_SLOP} from 'constants/theme';
import {openExternalLink} from 'utils/common';
import Icon from 'components/atoms/Icon';
import ListItem from 'components/molecules/ListItem';
import DefaultLayout from 'layouts/DefaultLayout';

type PolicyScreenProps = {
  navigation: StackNavigationProp<SettingStackParamList>;
};

const PolicyScreen = ({navigation}: PolicyScreenProps) => {
  const isDarkMode = useColorScheme() === 'dark';

  const borderColor = isDarkMode ? Colors.dark.border : Colors.light.border;
  const listBackgroundColor = isDarkMode
    ? Colors.dark.surface
    : Colors.light.surface;

  const handlePressTermsOfService = () => {
    openExternalLink(
      'https://antique-playroom-7c4.notion.site/37cf16a4b75f493192009abdd6e4fbae?pvs=4',
    );
  };

  const handlePressPrivacyPolicy = () => {
    openExternalLink(
      'https://antique-playroom-7c4.notion.site/fa3ff4fe50d943138b68584ff5bf2656?pvs=4',
    );
  };

  return (
    <DefaultLayout
      headerTitle="약관 및 정책"
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
        <ListItem title="서비스 이용약관" onPress={handlePressTermsOfService} />
        <ListItem
          title="개인정보 처리방침"
          onPress={handlePressPrivacyPolicy}
        />
      </View>
    </DefaultLayout>
  );
};

export default PolicyScreen;

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
  listItem: {
    width: 130,
  },
});
