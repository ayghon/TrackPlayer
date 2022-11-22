import { Card, makeStyles } from '@rneui/themed';
import React, { FC } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

export type PlaylistTitleSectionProps = {
  title: string;
  trackCount: number;
  style?: StyleProp<ViewStyle>;
};

export const PlaylistTitleSection: FC<PlaylistTitleSectionProps> = ({
  title,
  trackCount,
  style
}) => {
  const styles = useStyles();

  return (
    <View style={[style]}>
      <Card.Title style={styles.title}>{title}</Card.Title>
      <Card.Title style={styles.count}>{trackCount} tracks</Card.Title>
    </View>
  );
};

const useStyles = makeStyles({
  title: {
    textAlign: 'left',
    marginTop: 12,
    marginBottom: 0,
    fontWeight: 'bold',
    fontSize: 16
  },
  count: {
    marginTop: 4,
    textAlign: 'left',
    fontWeight: 'normal',
    fontSize: 14
  }
});
