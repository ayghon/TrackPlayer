import { ActivityIndicator, View } from 'react-native';
import { ImageProps, Image as RNEImage, makeStyles } from '@rneui/themed';
import React from 'react';

export const Image = (props: ImageProps) => {
  const styles = useStyles();
  if (!props?.source) {
    return <View style={[styles.image, props?.containerStyle, props?.style]} />;
  }

  return (
    <RNEImage
      PlaceholderContent={<ActivityIndicator />}
      placeholderStyle={styles.loader}
      resizeMode="cover"
      transition
      transitionDuration={200}
      {...props}
      containerStyle={[styles.image, props.containerStyle]}
    />
  );
};

const useStyles = makeStyles((theme) => ({
  image: {
    backgroundColor: theme.colors.background,
    borderRadius: 6
  },
  loader: {
    backgroundColor: theme.colors.background,
    height: '100%',
    width: '100%'
  }
}));
