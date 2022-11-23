import { Card, makeStyles } from '@rneui/themed';
import { DeleteSwipeAction } from './DeleteSwipeAction';
import { Image } from '../../image';
import { PlaylistTitleSection } from './PlaylistTitleSection';
import { Swipeable } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native';
import React, { FC } from 'react';

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
      activeOpacity={0.75}
      onPress={onPress}
      style={styles.button}
    >
      <Swipeable
        enabled={!!onDelete || !!onSwipeLeft}
        onSwipeableOpen={onSwipeOpen}
        renderRightActions={() => <DeleteSwipeAction />}
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
  button: {
    marginBottom: 8
  },
  container: {
    backgroundColor: `${theme.colors.white}`,
    borderColor: `${theme.colors.white}80`,
    borderRadius: 6,
    margin: 0,
    paddingHorizontal: 16,
    paddingVertical: 2,
    width: '100%'
  },
  image: {
    height: 40,
    width: 40
  },
  titleSection: {
    marginStart: 16
  },
  wrapper: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    width: '100%'
  }
}));
