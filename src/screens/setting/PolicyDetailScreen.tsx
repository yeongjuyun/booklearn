import {useEffect, useState} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  useColorScheme,
  useWindowDimensions,
} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import RenderHtml from 'react-native-render-html';
import Api from 'libs/axios/api';
import {Policy, ResponseType} from 'types/common';
import {SettingStackParamList} from 'types/navigation';
import {Colors, HIT_SLOP} from 'constants/theme';
import Icon from 'components/atoms/Icon';
import Spinner from 'components/atoms/Spinner';
import DefaultLayout from 'layouts/DefaultLayout';

type PolicyDetailScreenProps = {
  navigation: StackNavigationProp<SettingStackParamList>;
};

type PolicyDetailScreenRouteProp = RouteProp<
  SettingStackParamList,
  'PolicyDetail'
>;

const PolicyDetailScreen = ({navigation}: PolicyDetailScreenProps) => {
  const route = useRoute<PolicyDetailScreenRouteProp>();

  const isDarkMode = useColorScheme() === 'dark';
  const {width} = useWindowDimensions();
  const textColor = isDarkMode ? Colors.dark.text : Colors.light.text;

  const [policyData, setPolicyData] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchTermsOfService = () => {
    setIsLoading(true);
    Api.default.getTermsOfService({}, response => {
      if (response.type === ResponseType.SUCCESS) {
        setPolicyData(response.data);
      }
      setIsLoading(false);
    });
  };

  const fetchPrivacyPolicy = () => {
    setIsLoading(true);
    Api.default.getPrivacyPolicy({}, response => {
      if (response.type === ResponseType.SUCCESS) {
        setPolicyData(response.data);
      }
      setIsLoading(false);
    });
  };

  useEffect(() => {
    const fetchPolicyData = async () => {
      if (route.params.type === Policy.TERMS_OF_SERVICE) {
        fetchTermsOfService();
      } else if (route.params.type === Policy.PRIVACY_POLICY) {
        fetchPrivacyPolicy();
      }
    };

    fetchPolicyData();
  }, [route.params.type]);

  return (
    <DefaultLayout
      headerTitle="약관 및 정책"
      headerLeftContent={
        <Pressable hitSlop={HIT_SLOP} onPress={() => navigation.goBack()}>
          <Icon name="arrow_back" size={20} />
        </Pressable>
      }>
      {isLoading ? (
        <Spinner />
      ) : (
        <ScrollView style={[styles.base]}>
          <RenderHtml
            contentWidth={width}
            source={{html: policyData || ''}}
            baseStyle={{color: textColor}}
          />
          <View style={styles.bottomSpacing} />
        </ScrollView>
      )}
    </DefaultLayout>
  );
};

export default PolicyDetailScreen;

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: 16,
  },
  bottomSpacing: {marginTop: 30},
});
