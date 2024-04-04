import React from 'react';
import {ViewStyle, StyleProp, View, useColorScheme} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {icons} from 'constants/icon';

export type IconName = keyof typeof icons;
export interface IconProps {
  name: IconName;
  color?: string;
  size?: number;
  height?: number;
  width?: number;
  style?: StyleProp<ViewStyle>;
}

const Icon = ({name, size = 24, color, style}: IconProps) => {
  const isDarkMode = useColorScheme() === 'dark';

  const iconColorStyle = color ? color : isDarkMode ? '#ffffff' : '#211F26';

  return (
    <View style={style}>
      <SvgXml xml={icons[name]({color: iconColorStyle, size})} />
    </View>
  );
};

export default Icon;
