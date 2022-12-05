import { FAB, Icon, makeStyles, useTheme } from '@rneui/themed';
import React, { FC } from 'react';

export type FloatingPlayButtonProps = {
  isVisible: boolean;
  onPress: () => void;
};

export const FloatingPlayButton: FC<FloatingPlayButtonProps> = ({
  isVisible,
  onPress
}) => {
  const styles = useStyles();
  const { theme } = useTheme();

  return (
    <FAB
      buttonStyle={styles.fab}
      icon={<Icon color={theme.colors.white} name="play-arrow" size={32} />}
      onPress={onPress}
      visible={isVisible}
    />
  );
};

const useStyles = makeStyles((theme) => ({
  fab: { margin: 0, padding: 0 }
}));
