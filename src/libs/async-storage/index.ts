import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveTokensToStorage = async (
  accessToken: string,
  refreshToken: string,
) => {
  try {
    await AsyncStorage.setItem('accessToken', accessToken);
    await AsyncStorage.setItem('refreshToken', refreshToken);
    console.log('Tokens saved to AsyncStorage.');
  } catch (error) {
    console.error('Error saving tokens to AsyncStorage:', error);
  }
};

export const saveAccessTokenToStorage = async (accessToken: string) => {
  try {
    await AsyncStorage.setItem('accessToken', accessToken);
    console.log('Tokens saved to AsyncStorage.');
  } catch (error) {
    console.log('Error saving tokens to AsyncStorage:', error);
  }
};

export const getTokensFromStorage = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    return {refreshToken, accessToken};
  } catch (error) {
    console.log('Error getting tokens from AsyncStorage:', error);
    return {accessToken: '', refreshToken: ''};
  }
};

export const removeTokensFromStorage = async (onSuccess?: Function) => {
  try {
    await AsyncStorage.removeItem('refreshToken');
    await AsyncStorage.removeItem('accessToken');
    onSuccess?.();
    console.log('User logged out.');
  } catch (error) {
    console.log('Error logging out:', error);
  }
};
