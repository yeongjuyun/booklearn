import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from 'types/navigation';
import LaunchScreen from 'screens/auth/LaunchScreen';
import SocialLoginScreen from 'screens/auth/SocialLoginScreen';
import SigninScreen from 'screens/auth/SigninScreen';
import SignupScreen from 'screens/auth/SignupScreen';
import PasswordFindScreen from 'screens/auth/PasswordFindScreen';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthStack = ({
  navigation,
}: {
  navigation: StackNavigationProp<AuthStackParamList>;
}) => {
  return (
    <Stack.Navigator
      initialRouteName="Launch"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Main" component={SocialLoginScreen} />
      <Stack.Screen name="Launch" component={LaunchScreen} />
      <Stack.Screen name="Signin" component={SigninScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="PasswordFind" component={PasswordFindScreen} />
    </Stack.Navigator>
  );
};
