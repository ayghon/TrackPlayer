import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Image as _Image, ImageProps, makeStyles } from '@rneui/themed';

export const Image = (props: ImageProps) => {
  const styles = useStyles();

  if (!props?.source) {
    return <View style={props?.style} />;
  }

  return (
    <_Image
      resizeMode="cover"
      placeholderStyle={styles.loader}
      transition
      transitionDuration={200}
      PlaceholderContent={<ActivityIndicator />}
      {...props}
      containerStyle={[styles.image, props.containerStyle]}
    />
  );
};

const useStyles = makeStyles((theme) => ({
  image: {
    borderRadius: 6
  },
  loader: {
    height: '100%',
    width: '100%',
    backgroundColor: theme.colors.background
  }
}));
