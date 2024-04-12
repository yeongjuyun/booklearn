import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from 'types/navigation';
import {AuthStack} from './stack/AuthStack';
import {BookStack} from './stack/BookStack';
import {SettingStack} from './stack/SettingStack';

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
        <Stack.Screen name="Home" component={BookStack} />
        <Stack.Screen name="Setting" component={SettingStack} />
        <Stack.Screen
          name="Auth"
          component={AuthStack}
          options={{gestureEnabled: false}}
        />
        {/* Common modal screens */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigation;
