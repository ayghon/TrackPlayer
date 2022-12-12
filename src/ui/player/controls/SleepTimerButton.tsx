import { Icon, useTheme } from '@rneui/themed';
import React, { FC } from 'react';

export type SleepTimerButtonProps = {
  isActive: boolean;
  onPress: () => void;
};

export const SleepTimerButton: FC<SleepTimerButtonProps> = ({
  isActive,
  onPress
}) => {
  const { theme } = useTheme();

  return (
    <Icon
      color={isActive ? theme.colors.secondary : theme.colors.disabled}
      name="bedtime"
      onPress={onPress}
    />
  );
};
