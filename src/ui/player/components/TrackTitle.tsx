import { StyleProp, View, ViewStyle } from 'react-native';
import { Text } from '@rneui/base';
import React from 'react';
import { makeStyles } from '@rneui/themed';

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

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.colors.black,
    fontWeight: 'bold',
    fontSize: 24
  },
  artist: {
    color: theme.colors.black,
    fontSize: 16
  }
}));
