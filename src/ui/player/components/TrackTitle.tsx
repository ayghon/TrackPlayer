import { Horizontal } from '../../display';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Text, makeStyles } from '@rneui/themed';
import React from 'react';

export type TrackTitleProps = {
  title: string;
  artist: string;
  style?: StyleProp<ViewStyle>;
  minimal?: boolean;
};

export const TrackTitle = ({
  style,
  title,
  artist,
  minimal = false
}: TrackTitleProps) => {
  const styles = useStyles({ minimal });

  if (minimal) {
    return (
      <Horizontal alignCenter style={styles.minimalContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.minimalSeparator} />
        <Text style={styles.artist}>{artist}</Text>
      </Horizontal>
    );
  }

  return (
    <View style={style}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.artist}>{artist}</Text>
    </View>
  );
};

const useStyles = makeStyles((theme, { minimal }: { minimal?: boolean }) => ({
  artist: {
    fontSize: minimal ? 14 : 16
  },
  minimalContainer: {
    marginStart: 6
  },
  minimalSeparator: {
    backgroundColor: theme.colors.black,
    borderRadius: 100,
    height: 4,
    marginHorizontal: 4,
    width: 4
  },
  title: {
    fontSize: minimal ? 16 : 24,
    fontWeight: 'bold'
  }
}));
