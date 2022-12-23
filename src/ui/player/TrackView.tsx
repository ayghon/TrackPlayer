import { Image } from '../image';
import { MinimalTrackView } from './components/MinimalTrackView';
import { Stack } from 'native-base';
import { TrackControls } from './controls';
import { TrackControls as TrackControlsProps, i18nKeys } from '../../services';
import { TrackTitle } from './components/TrackTitle';
import { useTranslation } from 'react-i18next';
import React from 'react';

export type TrackViewProps = {
  controlsProps: TrackControlsProps;
  title?: string;
  artist?: string;
  artwork?: string;
  minimal?: boolean;
};

export const TrackView = ({
  controlsProps,
  title: _title,
  artist: _artist,
  artwork,
  minimal = false
}: TrackViewProps) => {
  const { t } = useTranslation();

  const artist = _artist || t(i18nKeys.ui.player.track_view.label.unknown);
  const title = _title || t(i18nKeys.ui.player.track_view.label.unknown);

  if (minimal) {
    return (
      <MinimalTrackView
        artist={artist}
        artwork={artwork}
        controlsProps={controlsProps}
        title={title}
      />
    );
  }

  return (
    <Stack space={4}>
      <Image
        height={360}
        source={artwork ? { uri: artwork } : undefined}
        width="100%"
      />
      <TrackTitle artist={artist} title={title} />
      <TrackControls {...controlsProps} />
    </Stack>
  );
};
