import {TouchableOpacity, View, useColorScheme} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp, useRoute} from '@react-navigation/native';
import {SettingStackParamList} from 'types/navigation';
import Icon from 'components/atoms/Icon';
import Text from 'components/atoms/Text';
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

  const isDarkMode = useColorScheme() === 'dark';

  return (
    <DefaultLayout
      headerTitle={route.params.title}
      headerLeftContent={
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow_back" size={20} />
        </TouchableOpacity>
      }>
      <View>
        <Text>Detail</Text>
      </View>
    </DefaultLayout>
  );
};

export default ReleaseNoteDetailScreen;
