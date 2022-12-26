import { Icon } from 'native-base';
import React, { FC } from 'react';

export type SleepTimerButtonProps = {
  isActive: boolean;
  onPress: () => void;
};

export const SleepTimerButton: FC<SleepTimerButtonProps> = ({
  isActive,
  onPress
}) => (
  <Icon
    color={isActive ? 'secondary.normal' : undefined}
    name="bedtime"
    onPress={onPress}
    size="2xl"
  />
);
