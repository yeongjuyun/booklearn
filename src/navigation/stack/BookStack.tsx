import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BookStackParamList} from 'types/navigation';
import {StackNavigationProp} from '@react-navigation/stack';
import BookshelfScreen from 'screens/book/BookshlefScreen';
import BookSearchScreen from 'screens/book/BookSearchScreen';
import BookNoteDetailScreen from 'screens/book/BookNoteDetailScreen';
import BookMemoEditScreen from 'screens/book/BookMemoEditScreen';
import BookEssayEditScreen from 'screens/book/BookEssayEditScreen';
import BookEssayDetailScreen from 'screens/book/BookEssayDetailScreen';

const Stack = createNativeStackNavigator<BookStackParamList>();

export const BookStack = ({
  navigation,
}: {
  navigation: StackNavigationProp<BookStackParamList>;
}) => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Bookshelf" component={BookshelfScreen} />
      <Stack.Screen name="Search" component={BookSearchScreen} />
      <Stack.Screen name="Detail" component={BookNoteDetailScreen} />
      <Stack.Screen name="Essay" component={BookEssayDetailScreen} />
      <Stack.Screen
        name="EditMemo"
        component={BookMemoEditScreen}
        options={{presentation: 'containedModal', gestureEnabled: false}}
      />
      <Stack.Screen
        name="EditEssay"
        component={BookEssayEditScreen}
        options={{presentation: 'containedModal', gestureEnabled: false}}
      />
    </Stack.Navigator>
  );
};
