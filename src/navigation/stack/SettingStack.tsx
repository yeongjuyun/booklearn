import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SettingStackParamList} from 'types/navigation';
import {StackNavigationProp} from '@react-navigation/stack';
import SettingScreen from 'screens/setting/SettingScreen';
import ProfileScreen from 'screens/setting/ProfileScreen';
import ProfileNicknameScreen from 'screens/setting/ProfileNicknameScreen';
import ProfilePasswordScreen from 'screens/setting/ProfilePasswordScreen';
import ReleaseNoteScreen from 'screens/setting/ReleaseNoteScreen';
import ReleaseNoteDetailScreen from 'screens/setting/ReleaseNoteDetailScreen';
import ThemeSettingScreen from 'screens/setting/ThemeSettingScreen';

const Stack = createNativeStackNavigator<SettingStackParamList>();

export const SettingStack = ({
  navigation,
}: {
  navigation: StackNavigationProp<SettingStackParamList>;
}) => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Main" component={SettingScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="ProfileNickname" component={ProfileNicknameScreen} />
      <Stack.Screen name="ProfilePassword" component={ProfilePasswordScreen} />
      <Stack.Screen name="ReleaseNote" component={ReleaseNoteScreen} />
      <Stack.Screen
        name="ReleaseNoteDetail"
        component={ReleaseNoteDetailScreen}
      />
      <Stack.Screen name="ThemeSetting" component={ThemeSettingScreen} />
    </Stack.Navigator>
  );
};
