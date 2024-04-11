import {ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';
import Text from 'components/atoms/Text';

interface TopNavigationProps {
  title?: string;
  leftContent?: ReactNode;
  rightContent?: ReactNode;
}

const TopNavigation = ({
  title,
  leftContent,
  rightContent,
}: TopNavigationProps) => {
  return (
    <View style={[styles.baseWrapper]}>
      <View style={styles.leftContentWrapper}>
        {leftContent && leftContent}
      </View>
      {title && (
        <Text h5 style={[styles.title]}>
          {title}
        </Text>
      )}
      {
        <View style={styles.rightContentWrapper}>
          {rightContent && rightContent}
        </View>
      }
    </View>
  );
};

export default TopNavigation;

const styles = StyleSheet.create({
  baseWrapper: {
    position: 'relative',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    gap: 10,
  },
  title: {
    position: 'absolute',
    textAlign: 'center',
    left: 0,
    right: 0,
  },
  leftContentWrapper: {zIndex: 10},
  rightContentWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 20,
  },
});
