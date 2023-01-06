import { IPressableProps, Icon, Pressable, Row, Text } from 'native-base';
import { i18nKeys } from '../../../services';
import { useTranslation } from 'react-i18next';
import React, { FC } from 'react';

export const AddTracksButton: FC<IPressableProps> = (props) => {
  const { t } = useTranslation();

  return (
    <Pressable {...props}>
      <Row alignItems="center">
        <Icon
          accessibilityLabel="add"
          bgColor="primary.light"
          borderRadius="md"
          color="text.primary"
          marginRight={2}
          name="add"
          opacity={0.8}
        />
        <Text>{t(i18nKeys.screens.playlist.button.add_tracks)}</Text>
      </Row>
    </Pressable>
  );
};
