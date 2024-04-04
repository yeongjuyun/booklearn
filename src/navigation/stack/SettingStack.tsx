import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SettingStackParamList} from 'types/navigation';
import {StackNavigationProp} from '@react-navigation/stack';
import SettingScreen from 'screens/setting/SettingScreen';

const Stack = createNativeStackNavigator<SettingStackParamList>();

export const SettingStack = ({
  navigation,
}: {
  navigation: StackNavigationProp<SettingStackParamList>;
}) => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Main" component={SettingScreen} />
    </Stack.Navigator>
  );
};
