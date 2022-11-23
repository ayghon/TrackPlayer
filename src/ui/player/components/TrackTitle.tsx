import { StyleProp, View, ViewStyle } from 'react-native';
import React from 'react';
import { makeStyles, Text } from '@rneui/themed';
import { Horizontal } from '../../display';

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
  minimalSeparator: {
    width: 4,
    backgroundColor: theme.colors.black,
    marginHorizontal: 4,
    height: 4,
    borderRadius: 100
  },
  minimalContainer: {
    marginStart: 6
  },
  title: {
    fontWeight: 'bold',
    fontSize: minimal ? 16 : 24
  },
  artist: {
    fontSize: minimal ? 14 : 16
  }
}));
