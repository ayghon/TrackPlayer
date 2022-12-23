import { Button, Modal } from 'native-base';
import { i18nKeys } from '../../services';
import { useTranslation } from 'react-i18next';
import React, { FC, PropsWithChildren } from 'react';

export type ConfirmDialogProps = {
  isOpen: boolean;
  close: () => void;
  confirmButton: {
    title: string;
    onPress: () => void;
    disabled?: boolean;
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
  const { t } = useTranslation();

  const defaultCancelText = t(
    i18nKeys.ui.dialog.confirm_dialog.cancel_action.title
  );

  return (
    <Modal isOpen={isOpen} onClose={close} useRNModal>
      <Modal.Content>
        <Modal.Header>
          {title}
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button.Group size="sm">
            <Button
              onPress={cancelButton?.onPress ?? close}
              variant="borderless"
            >
              {cancelButton?.title ?? defaultCancelText}
            </Button>
            <Button
              disabled={confirmButton.disabled}
              onPress={confirmButton.onPress}
            >
              {confirmButton.title}
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
