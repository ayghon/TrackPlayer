import { Icon, useTheme } from '@rneui/themed';
import { Pressable, ViewStyle } from 'react-native';
import { RepeatMode } from 'react-native-track-player';
import React, { FC } from 'react';

export type RepeatModeControlsProps = {
  repeatMode?: RepeatMode;
  style?: ViewStyle;
  onChange: (mode: RepeatMode) => void;
};

export const RepeatModeControls: FC<RepeatModeControlsProps> = ({
  repeatMode = RepeatMode.Off,
  style,
  onChange
}) => {
  const { theme } = useTheme();

  if (repeatMode === RepeatMode.Track) {
    return (
      <Pressable onPress={() => onChange(RepeatMode.Off)}>
        <Icon
          color={theme.colors.secondary}
          name="repeat-one"
          size={32}
          style={style}
        />
      </Pressable>
    );
  }

  const color =
    repeatMode === RepeatMode.Queue ? theme.colors.secondary : undefined;
  const changeHandler = () => {
    if (repeatMode === RepeatMode.Queue) {
      onChange(RepeatMode.Track);
    } else {
      onChange(RepeatMode.Queue);
    }
  };

  return (
    <Pressable onPress={changeHandler}>
      <Icon color={color} name="repeat" size={32} style={style} />
    </Pressable>
  );
};
