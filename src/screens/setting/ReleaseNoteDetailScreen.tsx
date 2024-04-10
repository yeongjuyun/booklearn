import {
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  useColorScheme,
  useWindowDimensions,
} from 'react-native';
import RenderHtml from 'react-native-render-html';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp, useRoute} from '@react-navigation/native';
import {SettingStackParamList} from 'types/navigation';
import {Colors, HIT_SLOP} from 'constants/theme';
import Icon from 'components/atoms/Icon';
import DefaultLayout from 'layouts/DefaultLayout';

type ReleaseNoteDetailScreenProps = {
  navigation: StackNavigationProp<SettingStackParamList>;
};

type ReleaseNoteDetailScreenRouteProp = RouteProp<
  SettingStackParamList,
  'ReleaseNoteDetail'
>;

const ReleaseNoteDetailScreen = ({
  navigation,
}: ReleaseNoteDetailScreenProps) => {
  const route = useRoute<ReleaseNoteDetailScreenRouteProp>();

  const {width} = useWindowDimensions();
  const isDarkMode = useColorScheme() === 'dark';
  const textColor = isDarkMode ? Colors.dark.text : Colors.light.text;

  return (
    <DefaultLayout
      headerTitle={route.params.title}
      headerLeftContent={
        <Pressable hitSlop={HIT_SLOP} onPress={() => navigation.goBack()}>
          <Icon name="arrow_back" size={20} />
        </Pressable>
      }>
      <ScrollView style={styles.base}>
        <RenderHtml
          contentWidth={width}
          source={{html: route.params.content}}
          baseStyle={{color: textColor}}
        />
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </DefaultLayout>
  );
};

export default ReleaseNoteDetailScreen;

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: 16,
  },
  bottomSpacing: {marginTop: 30},
});
