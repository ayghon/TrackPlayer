import { Card, makeStyles } from '@rneui/themed';
import { Image } from '../../image';
import { PlaylistTitleSection } from './PlaylistTitleSection';
import { TouchableOpacity } from 'react-native';
import React, { FC } from 'react';

export type GridPlaylistItemProps = {
  onPress?: () => void;
  trackCount: number;
  title: string;
  artwork?: string;
};

export const GridPlaylistItem: FC<GridPlaylistItemProps> = ({
  onPress,
  artwork,
  title,
  trackCount
}) => {
  const styles = useStyles();

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      style={styles.button}
    >
      <Card containerStyle={styles.container}>
        <Image
          containerStyle={styles.image}
          source={artwork ? { uri: artwork } : undefined}
        />
        <PlaylistTitleSection title={title} trackCount={trackCount} />
      </Card>
    </TouchableOpacity>
  );
};

const useStyles = makeStyles((theme) => ({
  button: {
    height: 232,
    width: 160
  },
  container: {
    backgroundColor: `${theme.colors.white}80`,
    borderColor: `${theme.colors.white}80`,
    borderRadius: 6,
    height: '100%',
    margin: 0,
    padding: 16,
    width: '100%'
  },
  image: {
    height: 128,
    width: 128
  }
}));
