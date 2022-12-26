import { Box, Row } from 'native-base';
import { Image } from '../../image';
import { PlayButton } from '../../button';
import { ProgressBar } from '../controls';
import { TrackControlsCapability } from '../../../services';
import { TrackTitle } from './TrackTitle';
import { TrackViewProps } from '../TrackView';
import React from 'react';

export type MinimalTrackViewProps = Omit<
  TrackViewProps,
  'minimal' | 'title' | 'artist'
> & {
  artist: string;
  title: string;
};

export const MinimalTrackView = ({
  controlsProps,
  title,
  artist,
  artwork
}: MinimalTrackViewProps) => {
  const { position, onProgressChange, capabilities, isPlaying, duration } =
    controlsProps;

  return (
    <Box backgroundColor="primary.opaque">
      <Row
        alignItems="center"
        justifyContent="space-between"
        marginX={3}
        marginY={3}
      >
        <Row space={4}>
          <Image
            height={10}
            source={artwork ? { uri: artwork } : undefined}
            width={10}
          />
          <TrackTitle artist={artist} minimal title={title} />
        </Row>
        <PlayButton
          isDisabled={capabilities[TrackControlsCapability.PLAY_PAUSE].disabled}
          isPlaying={isPlaying}
          onPress={capabilities[TrackControlsCapability.PLAY_PAUSE].onPress}
        />
      </Row>
      <ProgressBar
        duration={duration}
        minimal
        onProgressChange={onProgressChange}
        position={position}
      />
    </Box>
  );
};
