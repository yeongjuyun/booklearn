import {ReactNode} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Text from 'components/atoms/Text';

type ListItemProps = {
  title?: string;
  caption?: string;
  avatarUrl?: string;
  startContent?: ReactNode;
  endContent?: ReactNode;
  onPress?: () => void;
};

const ListItem = ({
  title,
  caption,
  avatarUrl,
  startContent,
  endContent,
  onPress,
}: ListItemProps) => {
  return (
    <TouchableOpacity style={styles.baseWrapper} onPress={onPress}>
      {startContent && <View>{startContent}</View>}
      <View style={styles.titleWrapper}>
        <Text body>{title}</Text>
        {caption && <Text caption>{caption}</Text>}
      </View>
      {endContent && <View>{endContent}</View>}
    </TouchableOpacity>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  baseWrapper: {
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  titleWrapper: {
    flex: 1,
    gap: 4,
  },
});
