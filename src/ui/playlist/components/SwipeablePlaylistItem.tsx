import { Card } from '../../display';
import { Image } from '../../image';
import { PlaylistItemSwipeAction } from './PlaylistItemSwipeAction';
import { PlaylistTitleSection } from './PlaylistTitleSection';
import { Pressable, StyledProps, View } from 'native-base';
import { Swipeable } from 'react-native-gesture-handler';
import { i18nKeys } from '../../../services';
import { useTranslation } from 'react-i18next';
import React, { FC } from 'react';

export type SwipeablePlaylistItemProps = StyledProps & {
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
  pinned,
  ...rest
}) => {
  const { t } = useTranslation();

  const onSwipeOpen = (direction: 'left' | 'right', { close }: Swipeable) => {
    if (direction === 'right') {
      onPin?.();
    } else {
      onDelete?.();
    }
    close();
  };

  return (
    <View {...rest}>
      <Swipeable
        // containerStyle={styles.button}
        enabled={!!onDelete || !!onPin}
        onSwipeableOpen={onSwipeOpen}
        renderLeftActions={() =>
          onDelete && (
            <PlaylistItemSwipeAction
              backgroundColor="error.700"
              label={t(i18nKeys.button.delete)}
            />
          )
        }
        renderRightActions={() =>
          onPin && (
            <PlaylistItemSwipeAction
              backgroundColor="success.700"
              label={
                pinned
                  ? t(i18nKeys.ui.playlist.swipe_action.unpin)
                  : t(i18nKeys.ui.playlist.swipe_action.pin)
              }
            />
          )
        }
      >
        <Pressable onPress={onPress}>
          <Card row>
            <Image
              height={10}
              source={artwork ? { uri: artwork } : undefined}
              width={10}
            />
            <PlaylistTitleSection
              marginLeft={4}
              pinned={pinned}
              title={title}
              trackCount={trackCount}
            />
          </Card>
        </Pressable>
      </Swipeable>
    </View>
  );
};
