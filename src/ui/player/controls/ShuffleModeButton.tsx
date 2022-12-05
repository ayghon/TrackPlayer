import { Icon, makeStyles, useTheme } from '@rneui/themed';
import React, { FC } from 'react';

export type ShuffleModeButtonProps = {
  isActive: boolean;
  onPress: () => void;
};

export const ShuffleModeButton: FC<ShuffleModeButtonProps> = ({
  isActive,
  onPress
}) => {
  const { theme } = useTheme();
  const styles = useStyles();

  return (
    <Icon
      color={isActive ? theme.colors.secondary : undefined}
      name="shuffle"
      onPress={onPress}
      size={32}
      style={styles.startIcon}
    />
  );
};

const useStyles = makeStyles({
  startIcon: {
    alignSelf: 'flex-start'
  }
});
