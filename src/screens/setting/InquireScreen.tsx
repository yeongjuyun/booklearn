import {StackNavigationProp} from '@react-navigation/stack';
import Icon from 'components/atoms/Icon';
import Text from 'components/atoms/Text';
import InquireForm from 'components/orginisms/form/InquireForm';
import {HIT_SLOP} from 'constants/theme';
import DefaultLayout from 'layouts/DefaultLayout';
import {Pressable, View} from 'react-native';
import {SettingStackParamList} from 'types/navigation';

type InquireScreenProps = {
  navigation: StackNavigationProp<SettingStackParamList>;
};

const InquireScreen = ({navigation}: InquireScreenProps) => {
  return (
    <DefaultLayout
      headerTitle="문의하기"
      headerLeftContent={
        <Pressable hitSlop={HIT_SLOP} onPress={() => navigation.goBack()}>
          <Icon name="arrow_back" size={20} />
        </Pressable>
      }>
      <InquireForm navigation={navigation} />
    </DefaultLayout>
  );
};

export default InquireScreen;
