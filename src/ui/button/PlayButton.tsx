import { Icon, makeStyles } from '@rneui/themed';
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
}) => {
  const styles = useStyles();

  return (
    <Icon
      disabled={isDisabled}
      disabledStyle={styles.icon}
      name={isPlaying ? 'play-arrow' : 'pause'}
      onPress={onPress}
      size={32}
    />
  );
};

const useStyles = makeStyles((theme) => ({
  icon: {
    backgroundColor: theme.colors.background
  }
}));
