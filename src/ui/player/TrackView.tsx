import { Image } from '../image';
import { MinimalTrackView } from './components/MinimalTrackView';
import { TrackControls } from './controls';
import { TrackControls as TrackControlsProps, i18nKeys } from '../../services';
import { TrackTitle } from './components/TrackTitle';
import { View } from 'react-native';
import { makeStyles } from '@rneui/themed';
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
  const styles = useStyles({ minimal });

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
    <View>
      <Image
        containerStyle={styles.image}
        source={artwork ? { uri: artwork } : undefined}
      />
      <TrackTitle artist={artist} style={styles.title} title={title} />
      <TrackControls {...controlsProps} />
    </View>
  );
};

const useStyles = makeStyles({
  image: {
    height: 400,
    marginBottom: 16,
    width: '100%'
  },
  title: {
    marginBottom: 24
  }
});
