import {
  ActivityIndicator,
  ImageProps,
  ImageStyle,
  StyleProp,
  View
} from 'react-native';
import { Image, makeStyles } from '@rneui/themed';
import React from 'react';

export type TrackArtworkProps = {
  source?: ImageProps['source'];
  style?: StyleProp<ImageStyle>;
};

export const TrackArtwork = (props?: TrackArtworkProps) => {
  const styles = useStyles();

  if (!props?.source) {
    return <View style={[props?.style, styles.artwork]} />;
  }

  return (
    <Image
      source={props.source}
      containerStyle={[props.style, styles.artwork]}
      resizeMode="cover"
      PlaceholderContent={<ActivityIndicator />}
    />
  );
};

const useStyles = makeStyles((theme) => ({
  artwork: {
    width: '100%',
    height: 400,
    backgroundColor: theme.colors.primary
  }
}));
