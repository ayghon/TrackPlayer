import { Icon, Row, StyledProps, Text, View } from 'native-base';
import { i18nKeys } from '../../../services';
import { useTranslation } from 'react-i18next';
import React, { FC } from 'react';

export type PlaylistTitleSectionProps = StyledProps & {
  title: string;
  trackCount: number;
  pinned?: boolean;
};

export const PlaylistTitleSection: FC<PlaylistTitleSectionProps> = ({
  title,
  trackCount,
  pinned = false,
  ...rest
}) => {
  const { t } = useTranslation();

  return (
    <View marginY={1} {...rest}>
      <Text variant="body2">{title}</Text>
      <Row alignItems="center" marginTop={1} space={1}>
        {pinned && <Icon color="secondary.normal" name="push-pin" size="sm" />}
        <Text textAlign="left" variant="caption">
          {t(i18nKeys.ui.playlist.track_count, { count: trackCount })}
        </Text>
      </Row>
    </View>
  );
};
