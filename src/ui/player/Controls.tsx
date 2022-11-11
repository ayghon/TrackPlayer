import { Button, Slider } from '@rneui/base';
import React from 'react';

type ControlButton = {
  disabled: boolean;
  onPress: () => void;
};

export enum ControlsCapability {
  PLAY_PAUSE = 'play-pause',
  JUMP_FORWARD = 'jump-forward',
  JUMP_BACKWARD = 'jump-backward',
  SKIP_TO_NEXT = 'skip-to-next',
  SKIP_TO_PREVIOUS = 'skip-to-previous'
}

export type ControlsProps = {
  position: number;
  isPlaying: boolean;
  duration: number;
  onProgressChange: (position: number) => void;
  capabilities: Record<ControlsCapability, ControlButton>;
};

export const Controls = ({
  duration,
  isPlaying,
  position,
  onProgressChange,
  capabilities
}: ControlsProps) => {
  return (
    <>
      <Slider
        value={position}
        maximumValue={duration}
        minimumValue={0}
        onSlidingComplete={onProgressChange}
      />
      <Button
        title="<"
        disabled={capabilities[ControlsCapability.SKIP_TO_PREVIOUS].disabled}
        onPress={capabilities[ControlsCapability.SKIP_TO_PREVIOUS].onPress}
      />
      <Button
        title="<<"
        disabled={capabilities[ControlsCapability.JUMP_BACKWARD].disabled}
        onPress={capabilities[ControlsCapability.JUMP_BACKWARD].onPress}
      />
      <Button
        title={isPlaying ? '|>' : '||'}
        disabled={capabilities[ControlsCapability.PLAY_PAUSE].disabled}
        onPress={capabilities[ControlsCapability.PLAY_PAUSE].onPress}
      />
      <Button
        title=">>"
        disabled={capabilities[ControlsCapability.JUMP_FORWARD].disabled}
        onPress={capabilities[ControlsCapability.JUMP_FORWARD].onPress}
      />
      <Button
        title=">"
        disabled={capabilities[ControlsCapability.SKIP_TO_NEXT].disabled}
        onPress={capabilities[ControlsCapability.SKIP_TO_NEXT].onPress}
      />
    </>
  );
};
