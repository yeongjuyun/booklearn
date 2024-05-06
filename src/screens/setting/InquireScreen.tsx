import {Pressable} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {SettingStackParamList} from 'types/navigation';
import {HIT_SLOP} from 'constants/theme';
import Icon from 'components/atoms/Icon';
import InquireForm from 'components/orginisms/form/InquireForm';
import DefaultLayout from 'layouts/DefaultLayout';

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
