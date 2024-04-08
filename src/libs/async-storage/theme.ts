import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_STORAGE_KEY = 'theme';

export const saveThemePreference = async (isDarkMode: boolean) => {
  try {
    await AsyncStorage.setItem(
      THEME_STORAGE_KEY,
      isDarkMode ? 'dark' : 'light',
    );
  } catch (error) {
    console.error('테마 설정 저장 중 오류 발생:', error);
  }
};

export const loadThemePreference = async () => {
  try {
    const theme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
    return theme === 'dark';
  } catch (error) {
    console.error('테마 설정 불러오기 중 오류 발생:', error);
    return false; // 기본값은 라이트 모드로 설정
  }
};
