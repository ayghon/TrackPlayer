import { Swipeable } from 'react-native-gesture-handler';
import { DeleteSwipeAction } from './DeleteSwipeAction';
import { Card, makeStyles } from '@rneui/themed';
import { Image } from '../../image';
import { TouchableOpacity } from 'react-native';
import React, { FC } from 'react';
import { PlaylistTitleSection } from './PlaylistTitleSection';

export type SwipeablePlaylistItemProps = {
  onPress?: () => void;
  onDelete?: () => void;
  onSwipeLeft?: () => void;
  trackCount: number;
  title: string;
  artwork?: string;
};

export const SwipeablePlaylistItem: FC<SwipeablePlaylistItemProps> = ({
  onPress,
  onDelete,
  onSwipeLeft,
  artwork,
  title,
  trackCount
}) => {
  const styles = useStyles();

  const onSwipeOpen = (direction: 'left' | 'right', { close }: Swipeable) => {
    if (direction === 'right') {
      onDelete?.();
    } else {
      onSwipeLeft?.();
    }
    close();
  };

  return (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.75}
      onPress={onPress}
    >
      <Swipeable
        enabled={!!onDelete || !!onSwipeLeft}
        renderRightActions={() => <DeleteSwipeAction />}
        onSwipeableOpen={onSwipeOpen}
      >
        <Card containerStyle={styles.container} wrapperStyle={styles.wrapper}>
          <Image
            containerStyle={styles.image}
            source={artwork ? { uri: artwork } : undefined}
          />
          <PlaylistTitleSection
            style={styles.titleSection}
            title={title}
            trackCount={trackCount}
          />
        </Card>
      </Swipeable>
    </TouchableOpacity>
  );
};

const useStyles = makeStyles((theme) => ({
  image: {
    height: 40,
    width: 40
  },
  button: {
    marginBottom: 8
  },
  titleSection: {
    marginStart: 16
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center'
  },
  container: {
    width: '100%',
    margin: 0,
    borderRadius: 6,
    backgroundColor: `${theme.colors.white}`,
    paddingVertical: 2,
    paddingHorizontal: 16,
    borderColor: `${theme.colors.white}80`
  }
}));
