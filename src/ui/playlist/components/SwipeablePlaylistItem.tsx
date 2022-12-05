import { Card, makeStyles, useTheme } from '@rneui/themed';
import { Image } from '../../image';
import { PlaylistItemSwipeAction } from './PlaylistItemSwipeAction';
import { PlaylistTitleSection } from './PlaylistTitleSection';
import { Swipeable } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native';
import { i18nKeys } from '../../../services';
import { useTranslation } from 'react-i18next';
import React, { FC } from 'react';

export type SwipeablePlaylistItemProps = {
  onPress?: () => void;
  onDelete?: () => void;
  onPin?: () => void;
  trackCount: number;
  title: string;
  artwork?: string;
  pinned?: boolean;
};

export const SwipeablePlaylistItem: FC<SwipeablePlaylistItemProps> = ({
  onPress,
  onDelete,
  onPin,
  artwork,
  title,
  trackCount,
  pinned
}) => {
  const styles = useStyles();
  const { t } = useTranslation();
  const { theme } = useTheme();

  const onSwipeOpen = (direction: 'left' | 'right', { close }: Swipeable) => {
    if (direction === 'right') {
      onPin?.();
    } else {
      onDelete?.();
    }
    close();
  };

  return (
    <Swipeable
      containerStyle={styles.button}
      enabled={!!onDelete || !!onPin}
      onSwipeableOpen={onSwipeOpen}
      renderLeftActions={() =>
        onDelete && (
          <PlaylistItemSwipeAction
            backgroundColor={theme.colors.error}
            label={t(i18nKeys.button.delete)}
          />
        )
      }
      renderRightActions={() =>
        onPin && (
          <PlaylistItemSwipeAction
            backgroundColor={theme.colors.success}
            label={
              pinned
                ? t(i18nKeys.ui.playlist.swipe_action.unpin)
                : t(i18nKeys.ui.playlist.swipe_action.pin)
            }
          />
        )
      }
    >
      <TouchableOpacity activeOpacity={0.75} onPress={onPress}>
        <Card containerStyle={styles.container} wrapperStyle={styles.wrapper}>
          <Image
            containerStyle={styles.image}
            source={artwork ? { uri: artwork } : undefined}
          />
          <PlaylistTitleSection
            pinned={pinned}
            style={styles.titleSection}
            title={title}
            trackCount={trackCount}
          />
        </Card>
      </TouchableOpacity>
    </Swipeable>
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
