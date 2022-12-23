import { Icon } from 'native-base';
import React, { FC } from 'react';

export type ShuffleModeButtonProps = {
  isActive: boolean;
  onPress: () => void;
};

export const ShuffleModeButton: FC<ShuffleModeButtonProps> = ({
  isActive,
  onPress
}) => (
  <Icon
    color={isActive ? 'secondary.normal' : undefined}
    name="shuffle"
    onPress={onPress}
    size="2xl"
  />
);
