import {Alert, Linking} from 'react-native';

export const openExternalLink = (url: string) => {
  Linking.openURL(url).catch(err =>
    Alert.alert('', '링크를 열 수 없습니다', [{text: '확인'}]),
  );
};
