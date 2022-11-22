import { TouchableOpacity } from 'react-native';
import { Card, makeStyles } from '@rneui/themed';
import { Image } from '../../image';
import React, { FC } from 'react';
import { PlaylistTitleSection } from './PlaylistTitleSection';

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
      style={styles.buttonGrid}
      activeOpacity={0.75}
      onPress={onPress}
    >
      <Card containerStyle={styles.containerGrid}>
        <Image
          containerStyle={styles.imageGrid}
          source={artwork ? { uri: artwork } : undefined}
        />
        <PlaylistTitleSection title={title} trackCount={trackCount} />
      </Card>
    </TouchableOpacity>
  );
};

const useStyles = makeStyles((theme) => ({
  imageGrid: {
    height: 128,
    width: 128
  },
  buttonGrid: {
    height: 220,
    width: 160
  },
  containerGrid: {
    margin: 0,
    borderRadius: 6,
    backgroundColor: `${theme.colors.white}80`,
    padding: 16,
    height: '100%',
    width: '100%',
    borderColor: `${theme.colors.white}80`
  }
}));
