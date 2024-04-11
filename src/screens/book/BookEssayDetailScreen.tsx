import {useEffect} from 'react';
import {Image, Pressable, ScrollView, StyleSheet, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp, useRoute} from '@react-navigation/native';
import EssayImage from 'assets/image/essay.png';
import {BookStackParamList} from 'types/navigation';
import {Colors, HIT_SLOP} from 'constants/theme';
import useInputs from 'hooks/useInputs';
import Text from 'components/atoms/Text';
import Icon from 'components/atoms/Icon';
import DefaultLayout from 'layouts/DefaultLayout';

type BookEssayDetailProps = {
  navigation: StackNavigationProp<BookStackParamList>;
};

type BookEssayScreenRouteProp = RouteProp<BookStackParamList, 'Essay'>;

function BookEssayDetailScreen({navigation}: BookEssayDetailProps) {
  const route = useRoute<BookEssayScreenRouteProp>();

  const {values, handleChange} = useInputs({
    bookshelfId: route.params?.id,
    id: route.params.essay?.id,
    content: route.params.essay?.content,
    createdAt: route.params.essay?.createdAt,
    updatedAt: route.params.essay?.updatedAt,
  });

  const handlePressEdit = () => {
    navigation.navigate('EditEssay', {id: values.bookshelfId, essay: values});
  };

  useEffect(() => {
    if (route.params.essay) {
      handleChange('content', route.params.essay.content);
    }
  }, [route.params.essay?.content]);

  return (
    <DefaultLayout
      headerTitle="에세이 보기"
      headerLeftContent={
        <Pressable hitSlop={HIT_SLOP} onPress={() => navigation.goBack()}>
          <Icon name="arrow_back" size={20} />
        </Pressable>
      }
      headerRightContent={
        <Pressable hitSlop={HIT_SLOP} onPress={handlePressEdit}>
          <Text body style={{color: Colors.primary}}>
            편집
          </Text>
        </Pressable>
      }>
      {values.content ? (
        <ScrollView style={styles.scrollViewWrapper}>
          <Text body numberOfLines={10000} style={styles.text}>
            {values.content}
          </Text>
        </ScrollView>
      ) : (
        <View style={styles.ViewWrapper}>
          <Image
            source={EssayImage}
            resizeMode="contain"
            style={styles.essayImage}
          />
          <Text caption style={styles.placeholder}>
            우측 상단 편집 버튼을 통해 에세이를 작성해보세요
          </Text>
        </View>
      )}
    </DefaultLayout>
  );
}
export default BookEssayDetailScreen;

const styles = StyleSheet.create({
  scrollViewWrapper: {
    flex: 1,
  },
  ViewWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
    paddingBottom: 120,
  },
  essayImage: {
    width: 200,
    height: 200,
  },
  text: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  subText: {},
  placeholder: {
    textAlign: 'center',
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
});
