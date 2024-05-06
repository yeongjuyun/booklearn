import {useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import Api from 'libs/axios/api';
import {ResponseType} from 'types/common';
import {SettingStackParamList} from 'types/navigation';
import {Colors} from 'constants/theme';
import useInputs from 'hooks/useInputs';
import Button from 'components/atoms/Button';
import Select from 'components/atoms/Select';
import Input from 'components/atoms/Input';

const CategoryTypeOptions = [
  {key: 'account', value: '계정'},
  {key: 'system', value: '시스템'},
  {key: 'etc', value: '기타'},
];

type InquireFormProps = {
  navigation: StackNavigationProp<SettingStackParamList>;
};

const InquireForm = ({navigation}: InquireFormProps) => {
  const {values, isValidLength, handleChange} = useInputs({
    category: '',
    content: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handlePressSubmit = () => {
    setIsLoading(true);

    const payload = {category: values.category, content: values.content};
    Api.setting.postInquire(payload, response => {
      if (response.type === ResponseType.SUCCESS) {
        navigation.navigate('SettingMain');
        Alert.alert('문의하기', '문의내용이 제출되었습니다');
      } else {
        Alert.alert('요청 실패', response.message);
      }

      setIsLoading(false);
    });
  };

  const handleChangeCategoryOption = (option: {key: string; value: string}) => {
    handleChange('category', option.value);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.base}>
      <View style={styles.form}>
        <View style={styles.inputWrapper}>
          <Select
            placeholder="카테고리 선택"
            options={CategoryTypeOptions}
            onChangeOption={handleChangeCategoryOption}
          />
          <Input
            placeholder="내용을 입력해주세요"
            value={values.content}
            multiline
            style={styles.textarea}
            onChangeText={text => handleChange('content', text)}
          />
        </View>
        <Button
          size="l"
          isLoading={isLoading}
          disabled={!isValidLength.category || !isValidLength.content}
          style={styles.submitButton}
          onPress={handlePressSubmit}>
          제출
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

export default InquireForm;

const styles = StyleSheet.create({
  base: {flex: 1},
  form: {flex: 1, justifyContent: 'space-between', paddingHorizontal: 16},
  inputWrapper: {gap: 10},
  textarea: {
    height: 300,
    alignItems: 'flex-start',
  },
  submitButton: {
    marginTop: 30,
    marginBottom: 16,
    backgroundColor: Colors.primary,
  },
});
