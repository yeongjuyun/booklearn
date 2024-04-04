import {ReactNode, useEffect} from 'react';
import {
  NativeModules,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  useColorScheme,
} from 'react-native';
import {Colors} from 'constants/theme';
import TopNavigation from 'components/molecules/TopNavigation';
import {useNavigation} from '@react-navigation/native';
import {getTokensFromStorage} from 'libs/async-storage';
import {RootStackParamList} from 'types/navigation';

const {StatusBarManager} = NativeModules;

type DefaultLayoutProps = {
  children: ReactNode;
  headerTitle?: string;
  backgroundColor?: string;
  isSafeAreaView?: boolean;
  headerLeftContent?: ReactNode;
  headerRightContent?: ReactNode;
};

const DefaultLayout = ({
  children,
  headerTitle,
  backgroundColor,
  isSafeAreaView = false,
  headerLeftContent,
  headerRightContent,
}: DefaultLayoutProps) => {
  const isDarkMode = useColorScheme() === 'dark';

  const baseContainerStyle = {
    flex: 1,
    paddingTop: Platform.OS ? StatusBarManager.HEIGHT : StatusBar.currentHeight,
    backgroundColor: backgroundColor
      ? backgroundColor
      : isDarkMode
      ? Colors.dark.background
      : Colors.light.background,
  };

  return (
    <>
      {isSafeAreaView ? (
        <SafeAreaView style={baseContainerStyle}>
          <TopNavigation
            title={headerTitle}
            leftContent={headerLeftContent}
            rightContent={headerRightContent}
          />
          {children}
        </SafeAreaView>
      ) : (
        <View style={baseContainerStyle}>
          <TopNavigation
            title={headerTitle}
            leftContent={headerLeftContent}
            rightContent={headerRightContent}
          />
          {children}
        </View>
      )}
    </>
  );
};

export default DefaultLayout;
