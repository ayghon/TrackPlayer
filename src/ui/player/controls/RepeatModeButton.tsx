import { Icon, useTheme } from '@rneui/themed';
import { RepeatMode } from 'react-native-track-player';
import { ViewStyle } from 'react-native';
import React, { FC } from 'react';

export type RepeatModeControlsProps = {
  repeatMode?: RepeatMode;
  style?: ViewStyle;
  onChange: (mode: RepeatMode) => void;
};

export const RepeatModeButton: FC<RepeatModeControlsProps> = ({
  repeatMode = RepeatMode.Off,
  style,
  onChange
}) => {
  const { theme } = useTheme();

  if (repeatMode === RepeatMode.Track) {
    return (
      <Icon
        color={theme.colors.secondary}
        name="repeat-one"
        onPress={() => onChange(RepeatMode.Off)}
        size={32}
        style={style}
      />
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
    <Icon
      color={color}
      name="repeat"
      onPress={changeHandler}
      size={32}
      style={style}
    />
  );
};
