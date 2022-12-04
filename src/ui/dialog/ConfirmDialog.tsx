import { Button, ButtonVariant } from '../button';
import { Dialog, makeStyles, useTheme } from '@rneui/themed';
import { i18nKeys } from '../../services';
import { useTranslation } from 'react-i18next';
import React, { FC, PropsWithChildren } from 'react';

export type ConfirmDialogProps = {
  isOpen: boolean;
  close: () => void;
  confirmButton: {
    title: string;
    onPress: () => void;
  };
  cancelButton?: {
    title?: string;
    onPress?: () => void;
  };
  title: string;
};

export const ConfirmDialog: FC<PropsWithChildren<ConfirmDialogProps>> = ({
  confirmButton,
  cancelButton,
  isOpen,
  title,
  close,
  children
}) => {
  const styles = useStyles();
  const { theme } = useTheme();
  const { t } = useTranslation();

  const defaultCancelText = t(
    i18nKeys.ui.dialog.confirm_dialog.cancel_action.title
  );

  return (
    <Dialog
      isVisible={isOpen}
      onBackdropPress={close}
      onRequestClose={close}
      overlayStyle={{
        backgroundColor: theme.colors.background
      }}
      style={styles.flex}
    >
      <Dialog.Title title={title} titleStyle={{ color: theme.colors.black }} />
      {children}
      <Dialog.Actions>
        <Button onPress={confirmButton.onPress} size="sm" style={styles.button}>
          {confirmButton.title}
        </Button>
        <Button
          onPress={cancelButton?.onPress ?? close}
          size="sm"
          variant={ButtonVariant.BORDERLESS}
        >
          {cancelButton?.title ?? defaultCancelText}
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
};

const useStyles = makeStyles({
  button: {
    marginStart: 4
  },
  coloPicker: {
    height: 250
  },
  flex: { flex: 1 }
});
