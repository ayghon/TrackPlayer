import { Slider, makeStyles, useTheme } from '@rneui/themed';
import React, { FC } from 'react';

export type ProgressBarProps = {
  onProgressChange: (position: number) => void;
  position: number;
  duration: number;
  minimal?: boolean;
};

export const ProgressBar: FC<ProgressBarProps> = ({
  onProgressChange,
  position,
  duration,
  minimal = false
}) => {
  const { theme } = useTheme();
  const styles = useStyles();

  return (
    <Slider
      maximumTrackTintColor={theme.colors.primary}
      maximumValue={duration}
      minimumTrackTintColor={theme.colors.secondary}
      minimumValue={0}
      onSlidingComplete={onProgressChange}
      style={minimal ? styles.minimalSlider : undefined}
      thumbStyle={minimal ? styles.minimalSliderThumb : styles.sliderThumb}
      thumbTintColor={theme.colors.secondary}
      thumbTouchSize={
        minimal ? { height: 2, width: 2 } : { height: 12, width: 12 }
      }
      trackStyle={minimal ? styles.minimalSliderTrack : styles.sliderTrack}
      value={position}
    />
  );
};

const useStyles = makeStyles({
  minimalSlider: {
    height: 6
  },
  minimalSliderThumb: {
    height: 2,
    width: 2
  },
  minimalSliderTrack: {
    height: 4
  },
  sliderThumb: { height: 16, width: 16 },
  sliderTrack: { height: 6 }
});
