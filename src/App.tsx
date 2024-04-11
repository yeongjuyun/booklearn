import {useEffect} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import RootNavigation from './navigation/RootNavigation';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  });

  return (
    <SafeAreaProvider>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <RootNavigation />
    </SafeAreaProvider>
  );
}

export default App;
