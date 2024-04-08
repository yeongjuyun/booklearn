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

type ProfileChangeNicknameFormProps = {
  navigation: StackNavigationProp<SettingStackParamList>;
};

const ProfileChangeNicknameForm = ({
  navigation,
}: ProfileChangeNicknameFormProps) => {
  const [nickname, setNickname] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handlePressSubmit = async () => {
    setIsLoading(true);

    // TODO: API 확인
    const payload = {name: nickname};
    await Api.user.updateNickname(payload, response => {
      console.log('response', response);
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
          autoFocus={true}
          onChangeText={value => setNickname(value)}
        />
        <Button
          size="l"
          isLoading={isLoading}
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
