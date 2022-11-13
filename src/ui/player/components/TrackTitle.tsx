import { StyleProp, View, ViewStyle } from 'react-native';
import React from 'react';
import { makeStyles, Text } from '@rneui/themed';

export type TrackTitleProps = {
  title: string;
  artist: string;
  style?: StyleProp<ViewStyle>;
};

export const TrackTitle = ({ style, title, artist }: TrackTitleProps) => {
  const styles = useStyles();

  return (
    <View style={style}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.artist}>{artist}</Text>
    </View>
  );
};

const useStyles = makeStyles({
  title: {
    fontWeight: 'bold',
    fontSize: 24
  },
  artist: {
    fontSize: 16
  }
});
