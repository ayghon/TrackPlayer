import { Icon, Pressable, Row, Text } from 'native-base';
import { i18nKeys } from '../../../services';
import { useTranslation } from 'react-i18next';
import React, { FC } from 'react';

export type DeletePlaylistButtonProps = {
  onPress: () => void;
};

export const DeletePlaylistButton: FC<DeletePlaylistButtonProps> = ({
  onPress
}) => {
  const { t } = useTranslation();

  return (
    <Pressable marginTop={8} onPress={onPress}>
      <Row alignItems="center" space={2}>
        <Icon accessibilityLabel="delete" color="error.700" name="delete" />
        <Text color="error.700" variant="body2">
          {t(i18nKeys.modals.playlist.settings.button.delete_playlist)}
        </Text>
      </Row>
    </Pressable>
  );
};
