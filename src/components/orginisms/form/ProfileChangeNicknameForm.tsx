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
import Button from 'components/atoms/Button';
import Input from 'components/atoms/Input';
import useInputs from 'hooks/useInputs';

type ProfileChangeNicknameFormProps = {
  navigation: StackNavigationProp<SettingStackParamList>;
};

const ProfileChangeNicknameForm = ({
  navigation,
}: ProfileChangeNicknameFormProps) => {
  const {values, isValidLength, handleChange} = useInputs({nickname: ''});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handlePressSubmit = () => {
    setIsLoading(true);

    const payload = {name: values.nickname};
    Api.user.updateNickname(payload, response => {
      if (response.type === ResponseType.SUCCESS) {
        navigation.navigate('Profile');
      } else {
        Alert.alert('요청 실패', response.message);
      }

      setIsLoading(false);
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.base}>
      <View style={styles.form}>
        <Input
          placeholder="닉네임"
          maxLength={30}
          autoFocus={true}
          onChangeText={text => handleChange('nickname', text)}
        />
        <Button
          size="l"
          isLoading={isLoading}
          disabled={!isValidLength.nickname}
          style={styles.submitButton}
          onPress={handlePressSubmit}>
          변경
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ProfileChangeNicknameForm;

const styles = StyleSheet.create({
  base: {flex: 1},
  form: {flex: 1, justifyContent: 'space-between', paddingHorizontal: 16},
  submitButton: {
    marginTop: 30,
    marginBottom: 16,
    backgroundColor: Colors.primary,
  },
});
