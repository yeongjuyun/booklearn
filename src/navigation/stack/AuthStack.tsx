import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from 'types/navigation';
import LaunchScreen from 'screens/auth/LaunchScreen';
import SigninScreen from 'screens/auth/SigninScreen';
import SignupScreen from 'screens/auth/SignupScreen';
import PasswordFindScreen from 'screens/auth/PasswordFindScreen';
import SocialLoginScreen from 'screens/auth/SocialLoginScreen';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthStack = ({
  navigation,
}: {
  navigation: StackNavigationProp<AuthStackParamList>;
}) => {
  return (
    <Stack.Navigator
      initialRouteName="Launch"
      screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      <Stack.Screen name="Social" component={SocialLoginScreen} />
      <Stack.Screen name="Launch" component={LaunchScreen} />
      <Stack.Screen name="Signin" component={SigninScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="PasswordFind" component={PasswordFindScreen} />
    </Stack.Navigator>
  );
};
