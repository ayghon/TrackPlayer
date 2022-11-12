import { Card, makeStyles } from '@rneui/themed';
import React, { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';

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
        {artwork ? (
          <Card.Image
            style={styles.image}
            resizeMode="cover"
            source={{ uri: artwork, width: 146, height: 150 }}
          />
        ) : (
          <View style={styles.artwork} />
        )}
        <Card.Title style={styles.title}>{title}</Card.Title>
        <Card.Title style={styles.count}>{trackCount} tracks</Card.Title>
      </Card>
    </TouchableOpacity>
  );
};

const useStyles = makeStyles((theme) => ({
  image: {
    borderRadius: 6
  },
  artwork: {
    backgroundColor: theme.colors.background,
    height: 150,
    width: 146
  },
  button: {
    height: 240,
    width: 180
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
