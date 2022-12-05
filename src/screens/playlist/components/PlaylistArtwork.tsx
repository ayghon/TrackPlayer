import { Image } from '../../../ui';
import { TouchableOpacity } from 'react-native';
import { makeStyles } from '@rneui/themed';
import React, { FC } from 'react';

export type PlaylistArtworkProps = {
  onPress: () => void;
  artwork?: string;
};

export const PlaylistArtwork: FC<PlaylistArtworkProps> = ({
  onPress,
  artwork
}) => {
  const styles = useStyles();

  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        containerStyle={styles.image}
        source={artwork ? { uri: artwork } : undefined}
      />
    </TouchableOpacity>
  );
};

const useStyles = makeStyles((theme) => ({
  image: {
    alignSelf: 'center',
    backgroundColor: theme.colors.white,
    height: 200,
    marginVertical: 16,
    width: 200
  }
}));
