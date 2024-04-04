import React, {ReactNode} from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import {Colors} from 'constants/theme';
import Text from 'components/atoms/Text';

type ActionSheetProps = {
  children?: ReactNode;
  title?: string;
  visible: boolean;
  onCancel: () => void;
};

const ActionSheet = ({
  children,
  title,
  visible,
  onCancel,
}: ActionSheetProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundColor = isDarkMode
    ? Colors.dark.surface
    : Colors.light.surface;

  const actionSheetStyle = {
    backgroundColor: backgroundColor,
  };

  const actionSheetHeaderBarStyle = {
    backgroundColor: isDarkMode ? Colors.dark.neutral : Colors.light.neutral,
  };

  if (!visible) {
    return null;
  }

  return (
    <Modal transparent visible={visible} animationType="fade">
      <TouchableOpacity
        activeOpacity={1}
        style={styles.backdrop}
        onPress={onCancel}>
        <View style={[styles.container, actionSheetStyle]}>
          <View style={styles.actionSheetHeader}>
            <View
              style={[styles.actionSheetHeaderBar, actionSheetHeaderBarStyle]}
            />
          </View>
          {title && (
            <Pressable onPress={() => {}}>
              <Text h3 style={styles.title}>
                {title}
              </Text>
            </Pressable>
          )}
          {children}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const ActionSheetItem = ({
  title,
  isSelected,
  onPress,
}: {
  title: string;
  isSelected: boolean;
  onPress: () => void;
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const TextColor = isSelected
    ? Colors.primary
    : isDarkMode
    ? Colors.dark.text
    : Colors.light.text;

  return (
    <TouchableOpacity style={[styles.item]} onPress={onPress}>
      <Text body style={{color: TextColor}}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export {ActionSheet, ActionSheetItem};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  actionSheetHeader: {height: 24, alignItems: 'center'},
  actionSheetHeaderBar: {width: 32, height: 4, borderRadius: 100},
  title: {marginBottom: 8},
  item: {paddingVertical: 20},
});
