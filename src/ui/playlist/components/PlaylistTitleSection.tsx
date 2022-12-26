import { Card, Icon, makeStyles, useTheme } from '@rneui/themed';
import { Horizontal } from '../../display';
import { StyleProp, View, ViewStyle } from 'react-native';
import { i18nKeys } from '../../../services';
import { useTranslation } from 'react-i18next';
import React, { FC } from 'react';

export type PlaylistTitleSectionProps = {
  title: string;
  trackCount: number;
  style?: StyleProp<ViewStyle>;
  pinned?: boolean;
};

export const PlaylistTitleSection: FC<PlaylistTitleSectionProps> = ({
  title,
  trackCount,
  style,
  pinned = false
}) => {
  const { t } = useTranslation();
  const styles = useStyles({ pinned });
  const { theme } = useTheme();

  return (
    <View style={[style]}>
      <Card.Title style={styles.title}>{title}</Card.Title>
      <Horizontal style={styles.metadata}>
        {pinned && (
          <Icon color={theme.colors.secondary} name="push-pin" size={16} />
        )}
        <Card.Title style={styles.count}>
          {t(i18nKeys.ui.playlist.track_count, { count: trackCount })}
        </Card.Title>
      </Horizontal>
    </View>
  );
};

const useStyles = makeStyles((_, { pinned }: { pinned: boolean }) => ({
  count: {
    fontSize: 14,
    fontWeight: 'normal',
    paddingStart: pinned ? 4 : 0,
    textAlign: 'left'
  },
  metadata: {
    marginTop: 4
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 0,
    marginTop: 12,
    textAlign: 'left'
  }
}));
