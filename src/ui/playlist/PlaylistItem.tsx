import { Card, makeStyles } from '@rneui/themed';
import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { Image } from '../image';

export type PlaylistItemProps = {
  trackCount: number;
  title: string;
  artwork?: string;
  onPress?: () => void;
};

export const PlaylistItem: FC<PlaylistItemProps> = ({
  trackCount,
  title,
  artwork,
  onPress
}) => {
  const styles = useStyles();

  return (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.75}
      onPress={onPress}>
      <Card containerStyle={styles.container}>
        <Image
          containerStyle={styles.image}
          source={artwork ? { uri: artwork } : undefined}
        />
        <Card.Title style={styles.title}>{title}</Card.Title>
        <Card.Title style={styles.count}>{trackCount} tracks</Card.Title>
      </Card>
    </TouchableOpacity>
  );
};

const useStyles = makeStyles((theme) => ({
  loader: {
    height: '100%',
    width: '100%',
    backgroundColor: theme.colors.background
  },
  image: {
    height: 128,
    width: 128
  },
  artwork: {
    backgroundColor: theme.colors.background,
    height: 128,
    width: 128
  },
  button: {
    height: 220,
    width: 160
  },
  container: {
    margin: 0,
    borderRadius: 6,
    backgroundColor: `${theme.colors.white}80`,
    padding: 16,
    height: '100%',
    width: '100%',
    borderColor: `${theme.colors.white}80`
  },
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
}));
