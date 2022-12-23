import { Icon } from 'native-base';
import { RepeatMode } from 'react-native-track-player';
import React, { FC } from 'react';

export type RepeatModeControlsProps = {
  repeatMode?: RepeatMode;
  onChange: (mode: RepeatMode) => void;
};

export const RepeatModeButton: FC<RepeatModeControlsProps> = ({
  repeatMode = RepeatMode.Off,
  onChange
}) => {
  if (repeatMode === RepeatMode.Track) {
    return (
      <Icon
        color="secondary.normal"
        name="repeat-one"
        onPress={() => onChange(RepeatMode.Off)}
        size="2xl"
      />
    );
  }

  const color =
    repeatMode === RepeatMode.Queue ? 'secondary.normal' : undefined;
  const changeHandler = () => {
    if (repeatMode === RepeatMode.Queue) {
      onChange(RepeatMode.Track);
    } else {
      onChange(RepeatMode.Queue);
    }
  };

  return (
    <Icon color={color} name="repeat" onPress={changeHandler} size="2xl" />
  );
};
