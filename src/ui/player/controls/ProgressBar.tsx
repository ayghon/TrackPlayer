import { Progress, Slider } from 'native-base';
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
  if (minimal) {
    return (
      <Progress
        max={duration}
        min={0}
        size={minimal ? 'xs' : 'sm'}
        value={position}
      />
    );
  }

  return (
    <Slider
      maxValue={duration}
      minValue={0}
      onChange={onProgressChange}
      size={minimal ? 'md' : 'lg'}
      value={position}
    >
      <Slider.Track>
        <Slider.FilledTrack />
      </Slider.Track>
      <Slider.Thumb height={minimal ? 0 : 4} width={minimal ? 0 : 4} />
    </Slider>
  );
};
