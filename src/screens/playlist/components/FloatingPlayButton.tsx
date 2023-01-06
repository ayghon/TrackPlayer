import { Fab, Icon } from 'native-base';
import { testIds } from '../../../utils';
import React, { FC } from 'react';

export type FloatingPlayButtonProps = {
  isVisible: boolean;
  onPress: () => void;
};

export const FloatingPlayButton: FC<FloatingPlayButtonProps> = ({
  isVisible,
  onPress
}) => {
  if (!isVisible) {
    return null;
  }

  return (
    <Fab
      bg="secondary.normal"
      bottom={0}
      icon={
        <Icon
          accessibilityLabel="play arrow"
          color="text.secondary"
          name="play-arrow"
          size="2xl"
        />
      }
      onPress={onPress}
      renderInPortal={false}
      right={0}
      testID={testIds.button.play}
    />
  );
};
