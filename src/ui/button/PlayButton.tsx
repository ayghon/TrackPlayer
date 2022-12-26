import { Icon } from 'native-base';
import React, { FC } from 'react';

export type PlayButtonProps = {
  onPress: () => void;
  isDisabled: boolean;
  isPlaying: boolean;
};

export const PlayButton: FC<PlayButtonProps> = ({
  isDisabled,
  isPlaying,
  onPress
}) => (
  <Icon
    color={isDisabled ? undefined : 'text.primary'}
    disabled={isDisabled}
    name={isPlaying ? 'play-arrow' : 'pause'}
    onPress={onPress}
    size="4xl"
  />
);
